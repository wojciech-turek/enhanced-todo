import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Container, Box } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Spinner from "../../UI/Spinner";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
  },
}));

const AddTask = (props: {
  categories: string[];
  cancel: any;
  onTaskAddREquest: any;
  success: boolean;
  loading: boolean;
  user: string;
  token: string;
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCat, setSelectedCat] = useState("");
  const [content, setContent] = useState("");
  const [validContent, setValidContent] = useState(true);

  const classes = useStyles();

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleCatChange = (e: any) => {
    setSelectedCat(e.target.value);
  };

  const validateContent = () => {
    if (content.length < 3) return setValidContent(false);
    if (content.length >= 3) return setValidContent(true);
  };

  const handleAddNewTask = () => {
    const nowDate = new Date();
    const deadline = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedDate.getHours(),
      selectedDate.getMinutes()
    );
    const task = {
      user: props.user,
      created: nowDate.toLocaleString(),
      category: selectedCat,
      content: content,
      active: true,
      deadline: deadline.toLocaleString(),
    };
    if (validContent) {
      props.onTaskAddREquest(task, props.token);
      setContent("");
      setSelectedDate(new Date());
      setSelectedCat("");
    }
  };
  return (
    <Container className={classes.container}>
      <Box marginBottom={2}>
        {props.loading ? <Spinner /> : null}
        {props.success ? (
          <Alert severity="success">Task added successfully</Alert>
        ) : null}
      </Box>
      <form noValidate autoComplete="off">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between">
            <TextField
              label="Enter your task"
              multiline
              fullWidth
              error={!validContent}
              value={content}
              required
              onBlur={validateContent}
              onChange={handleContentChange}
              helperText={
                validContent
                  ? ""
                  : "The length of the content should be at least 3 characters"
              }
            />
            <KeyboardDatePicker
              disablePast
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              label="Date deadline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              ampm={false}
              label="Time deadline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <FormControl component="fieldset">
          <FormLabel component="legend">Please select category:</FormLabel>
          <RadioGroup
            row
            aria-label="category"
            name="category"
            value={selectedCat}
            onChange={handleCatChange}
          >
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
            <FormControlLabel value="Home" control={<Radio />} label="Home" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewTask}
          >
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={props.cancel}>
            Close
          </Button>
        </Box>
      </form>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.userId,
    loading: state.auth.loading,
    error: state.auth.regError,
    success: state.auth.addTaskSuccess,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onTaskAddREquest: (taskData: any, token: string) =>
      dispatch(actions.addTask(taskData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
