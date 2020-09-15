import React, { useEffect } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Task from "./Task/task";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as actions from "../../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  compltetedTask: {
    background: "rgba(10,135,84,0.3)",
  },
}));

const ToDoTasks = React.memo((props: any) => {
  const classes = useStyles();
  const [newOpen, setNewOpen] = React.useState(true);
  const [completedOpen, setCompletedOpen] = React.useState(false);
  const { token, onLoadTaskRequest } = props;

  const handleNewClick = (e: any) => {
    setNewOpen(!newOpen);
  };
  const handleCompletedClick = (e: any) => {
    setCompletedOpen(!completedOpen);
  };

  const handleActiveChange = (id: number) => {
    console.log(id);
  };

  useEffect(() => {
    onLoadTaskRequest(token);
  }, [token, onLoadTaskRequest]);

  const compltedTaskArr = props.loaded
    ? props.tasks.filter((el: any) => el.active === false)
    : [];
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
  const activeTasksArr = props.loaded
    ? props.tasks.filter((el: any) => el.content.active === true)
    : [];
  const activeTasks = activeTasksArr.map((el: any) => {
    return (
      <ListItem key={el.key}>
        <Task
          timestamp={el.content.created}
          category={el.content.category}
          content={el.content.content}
          active={el.content.active}
          deadline={el.content.deadline}
          changeActive={handleActiveChange}
          id={el.content.id}
        />
      </ListItem>
    );
  });
  console.log(`Rendering ToDoTasks`);
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
            <List component="div">
              {props.loading ? "loading" : activeTasks}
            </List>
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
            <List component="div">
              {props.loading ? "loading" : completedTasks}
            </List>
          </Collapse>
        </List>
      </Container>
    </div>
  );
});

const mapStateToProps = (state: any) => {
  return {
    tasks: state.auth.tasks,
    loading: state.auth.loading,
    error: state.auth.loadTaskError,
    token: state.auth.token,
    loaded: state.auth.loadTaskSuccess,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onLoadTaskRequest: (token: string) => dispatch(actions.loadTasks(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoTasks);
