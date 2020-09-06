import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Container, TextField, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { RegisterProps, StateProps } from "../../interfaces/interfaces";
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterPage(props: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValidEmail(re.test(String(username).toLowerCase()));
    if (username.length === 0) {
      setValidEmail(true);
    }
  };

  const validatePassword = () => {
    const re = /^(?=.*\d).{8,}$/;
    setValidPassword(re.test(String(password).toLowerCase()));
  };
  const handleSubmit = (event?: React.FormEvent) => {
    if (event !== undefined) event.preventDefault();
    if (validEmail && validPassword) {
      props.onRegisterRequest(username, password);
      setUsername("");
      setPassword("");
    }
  };

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
      case "EMAIL_EXISTS":
        return "The email you've entered is already in use!";
      case "OPERATION_NOT_ALLOWED":
        return "Registration is currently disabled";
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        return "Server is currently busy, please try again later";
      default:
        return "Error";
    }
  };
  const startRedirect = () => {
    setTimeout(() => setRedirect(true), 1500);
  };

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, _) => (
        <RouterLink to={"login"} {...linkProps} />
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
            Register New Account
          </Typography>

          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {props.loading ? <Spinner /> : " "}
            {props.auth ? (
              <>
                <Alert severity="success">
                  Registration successful! Taking you to the app!
                </Alert>
                {startRedirect()}
                {redirect ? <Redirect to="/todoapp" /> : null}
              </>
            ) : (
              " "
            )}
            {props.error ? (
              <Alert severity="error">{getErrorMessage(props.error)}</Alert>
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
              onBlur={validatePassword}
              value={password}
              error={!validPassword}
              onChange={(e) => handleInput(e)}
              helperText={
                !validPassword
                  ? "Password must be at least 8 characters long and include one digit"
                  : ""
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" component={CustomLink}>
                  {"Already have an account? Sign In"}
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
    error: state.auth.regError,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onRegisterRequest: (username: string, password: string) =>
      dispatch(actions.signup(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
