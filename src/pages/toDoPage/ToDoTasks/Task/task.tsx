import React from "react";
import { TaskProps } from "../../../../interfaces/interfaces";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import WorkIcon from "@material-ui/icons/Work";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BlurOnIcon from "@material-ui/icons/BlurOn";

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    width: "100%",
    wordBreak: "break-word",
  },
  text: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    backgroundColor: red[500],
  },
  checkbox: {
    marginLeft: 4,
  },
});

const Task = (props: TaskProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.category === "Work" ? <WorkIcon /> : null}
            {props.category === "Home" ? <HomeWorkIcon /> : null}
            {props.category === "Other" ? <BlurOnIcon /> : null}
          </Avatar>
        }
        titleTypographyProps={{ variant: "subtitle1" }}
        title={props.content}
        subheader={`Created on ${props.timestamp.date} at ${props.timestamp.time}`}
      />
      <CardActions>
        <FormControlLabel
          className={classes.checkbox}
          control={
            <Checkbox
              id={props.id}
              checked={!props.active}
              name={props.content}
              onChange={(e: any) => props.changeActive(e.target.id)}
            />
          }
          label={
            props.active ? "Mark as completed" : "Uncheck to mark as active"
          }
        />
      </CardActions>
    </Card>
  );
};

export default Task;
