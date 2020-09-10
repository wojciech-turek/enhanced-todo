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

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
  },
}));

const AddTask = (props: { categories: string[]; cancel: any }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCat, setSelectedCat] = useState("");
  const [content, setContent] = useState("");

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
  console.log(selectedCat);
  return (
    <Container className={classes.container}>
      <form noValidate autoComplete="off">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-between">
            <TextField
              label="Enter your task"
              multiline
              fullWidth
              value={content}
              onChange={handleContentChange}
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
          <Button variant="contained" color="primary">
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={props.cancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};
export default AddTask;
