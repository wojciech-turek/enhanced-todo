import * as actionTypes from "../actionTypes";
import axios from "axios";

export const addTaskStart = () => {
  return {
    type: actionTypes.NEW_TASK_START,
  };
};

export const addTaskSuccess = () => {
  return {
    type: actionTypes.NEW_TASK_SUCCESS,
  };
};
export const addTaskFail = () => {
  return {
    type: actionTypes.NEW_TASK_FAIL,
  };
};

export const loadTasksStart = () => {
  return {
    type: actionTypes.GET_TASKS_START,
  };
};

export const loadTaskSuccess = (tasks: any) => {
  return {
    type: actionTypes.GET_TASKS_SUCCESS,
    tasks: tasks,
  };
};

export const loadTaskFail = (error: Error) => {
  return {
    type: actionTypes.GET_TASKS_FAIL,
    error: error,
  };
};

export const loadTasks = (token: string) => {
  return (dispatch: any) => {
    axios
      .get("https://mytodoapp-4bab3.firebaseio.com/tasks.json?auth=" + token)
      .then((response) => {
        var myData = Object.keys(response.data).map((item) => ({
          content: response.data[item],
          key: [item],
        }));
        dispatch(loadTaskSuccess(myData));
      })
      .catch((error: Error) => {
        dispatch(loadTaskFail(error));
      });
  };
};

export const addTask = (task: any, token: string) => {
  return (dispatch: any) => {
    dispatch(addTaskStart());
    axios
      .post(
        "https://mytodoapp-4bab3.firebaseio.com/tasks.json?auth=" + token,
        task
      )
      .then(() => {
        dispatch(addTaskSuccess());
        dispatch(loadTasks(token));
      })
      .catch(() => {
        dispatch(addTaskFail());
      });
  };
};
