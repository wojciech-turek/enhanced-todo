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

export const loadTasks = () => {
  return (dispatch: any) => {
    axios
      .get("https://mytodoapp-4bab3.firebaseio.com/tasks.json")
      .then((response) => {
        dispatch(loadTaskSuccess(response.data));
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
        setTimeout(() => {
          dispatch(addTaskFail());
        }, 1000);
      })
      .catch(() => {
        dispatch(addTaskFail());
      });
  };
};
