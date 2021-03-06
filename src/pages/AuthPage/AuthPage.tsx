import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, TextField, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { AuthProps, StateProps } from "../../interfaces/interfaces";
import * as actions from "../../store/actions/index";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AuthPage(props: AuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { auth } = props;

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValidEmail(re.test(String(username).toLowerCase()));
    if (username.length === 0) {
      setValidEmail(true);
    }
  };

  const handleSubmit = (event?: React.FormEvent) => {
    if (event !== undefined) event.preventDefault();
    if (validEmail) {
      props.onLogInRequest(username, password);
    }
  };

  useEffect(() => {
    if (auth) {
      setRedirect(true);
    } else {
      setRedirect(false);
    }
  }, [auth]);

  const handleInput = (e: { target: { id: string; value: string } }) => {
    if (e.target.id === "email") {
      setUsername(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "EMAIL_NOT_FOUND":
        return "There is no account under that email address";
      case "INVALID_PASSWORD":
        return "Password is incorrect";
      case "USER_DISABLED":
        return "This user has been disabled";
      default:
        return "Error";
    }
  };

  // const startRedirect = () => {
  //   let isSubscribed = true;
  //   if (isSubscribed) {
  //     const timer = setTimeout(() => {
  //       setRedirect(true);
  //       isSubscribed = false;
  //       if (!isSubscribed) {
  //         clearTimeout(timer);
  //       }
  //     }, 1500);
  //   }
  // };

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, _) => (
        <RouterLink to={"signup"} {...linkProps} />
      )),
    []
  );

  const classes = useStyles();
  return (
    <Fade in={true} timeout={400}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {props.loading ? <Spinner /> : " "}
            {props.error ? (
              <Alert severity="error">{getErrorMessage(props.error)}</Alert>
            ) : (
              " "
            )}
            {props.auth ? (
              <>
                <Alert severity="success">
                  Login successful! Taking you to the app!
                </Alert>
                {redirect ? <Redirect to="/todoapp" /> : null}
              </>
            ) : (
              " "
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onBlur={validateEmail}
              value={username}
              onChange={(e) => handleInput(e)}
              error={!validEmail}
              helperText={!validEmail ? "Please enter a valid Email" : ""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => handleInput(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" component={CustomLink}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Fade>
  );
}

const mapStateToProps = (state: StateProps) => {
  return {
    auth: state.auth.authenticated,
    loading: state.auth.loading,
    error: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onLogInRequest: (username: string, password: string) =>
      dispatch(actions.login(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
