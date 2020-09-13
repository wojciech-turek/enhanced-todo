import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Task from "./Task/task";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  compltetedTask: {
    background: "rgba(10,135,84,0.3)",
  },
}));

let Tasks = [
  {
    id: "1",
    timestamp: {
      date: "08/09/2020",
      time: "15:23",
    },
    category: "Work",
    content: "Prepare yearly report.",
    active: true,
    deadline: "22/09/2020",
  },
  {
    id: "2",
    timestamp: {
      date: "08/09/2020",
      time: "15:28",
    },
    category: "Home",
    content:
      "Clean theasdasdsdfgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dishes",
    active: true,
    deadline: "18/09/2020",
  },
  {
    id: "3",
    timestamp: {
      date: "08/09/2020",
      time: "15:28",
    },
    category: "Other",
    content: "Look for a new job",
    active: false,
    deadline: "28/09/2020",
  },
];

const ToDoTasks = () => {
  const classes = useStyles();
  const [newOpen, setNewOpen] = React.useState(true);
  const [completedOpen, setCompletedOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState(Tasks);

  useEffect((): any => {}, []);

  const handleNewClick = (e: any) => {
    setNewOpen(!newOpen);
  };
  const handleCompletedClick = (e: any) => {
    setCompletedOpen(!completedOpen);
  };

  const handleActiveChange = (id: number) => {
    console.log(id);
  };

  const compltedTaskArr = tasks.filter((el) => el.active === false);
  const completedTasks: any = compltedTaskArr.map((el: any) => {
    if (!el.active) {
      return (
        <ListItem key={el.id} className={classes.compltetedTask}>
          <Task
            timestamp={el.timestamp}
            category={el.category}
            content={el.content}
            active={el.active}
            deadline={el.deadline}
            changeActive={handleActiveChange}
            id={el.id}
          />
        </ListItem>
      );
    }
    return null;
  });
  const activeTasksArr = tasks.filter((el) => el.active === true);
  const activeTasks = activeTasksArr.map((el: any) => {
    if (el.active) {
      return (
        <ListItem key={el.id}>
          <Task
            timestamp={el.timestamp}
            category={el.category}
            content={el.content}
            active={el.active}
            deadline={el.deadline}
            changeActive={handleActiveChange}
            id={el.id}
          />
        </ListItem>
      );
    }
    return null;
  });

  return (
    <div>
      <Container maxWidth={false}>
        <List className={classes.root}>
          <ListItem button onClick={handleNewClick}>
            <Typography component="h2" variant="h5">
              Active Tasks ({activeTasks.length})
            </Typography>
            {newOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={newOpen} timeout="auto">
            <List component="div">{activeTasks}</List>
          </Collapse>
        </List>
        <List className={classes.root}>
          <ListItem button onClick={handleCompletedClick}>
            <Typography component="h2" variant="h5">
              Completed Tasks ({completedTasks.length})
            </Typography>
            {completedOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={completedOpen} timeout="auto">
            <List component="div">{completedTasks}</List>
          </Collapse>
        </List>
      </Container>
    </div>
  );
};

export default ToDoTasks;
