import * as actionTypes from "./actionTypes";

interface ReducerState {
  authenticated: boolean;
  token: string;
  userId: string;
  authError?: string;
  regError?: string;
  loading: boolean;
  addTaskSuccess: boolean;
}

const initialState: ReducerState = {
  authenticated: false,
  token: "",
  userId: "",
  loading: false,
  authError: "",
  regError: "",
  addTaskSuccess: false,
};

interface AuthAction {
  type: string;
  user: string;
  pass: string;
  idToken: string;
  userId: string;
  regError: Error;
  authError: Error;
}

const todos = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return {
        ...state,
        regError: null,
        loading: true,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        regError: null,
        token: action.idToken,
        userId: action.userId,
        loading: false,
        authenticated: true,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        regError: action.regError,
        loading: false,
        authenticated: false,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        authError: null,
        token: action.idToken,
        userId: action.userId,
        loading: false,
        authenticated: true,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        authError: action.authError,
        loading: false,
        authenticated: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        userId: null,
      };
    case actionTypes.NEW_TASK_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.NEW_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        addTaskSuccess: true,
      };
    case actionTypes.NEW_TASK_FAIL:
      return {
        ...state,
        loading: false,
        addTaskSuccess: false,
      };
    default:
      return state;
  }
};

export default todos;