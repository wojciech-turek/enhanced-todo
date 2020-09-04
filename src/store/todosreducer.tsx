import * as actionTypes from "./actionTypes";

interface ReducerState {
  authenticated: boolean;
  token: string;
  userID: string;
  error?: string;
  loading: boolean;
}

const initialState: ReducerState = {
  authenticated: false,
  token: "",
  userID: "",
  loading: false,
  error: "",
};

interface AuthAction {
  type: string;
  user: string;
  pass: string;
  idToken: string;
  userId: string;
  error: Error;
}

const todos = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.idToken,
        userID: action.userId,
        loading: false,
        authenticated: true,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        authenticated: false,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        token: action.idToken,
        userID: action.userId,
        loading: false,
        authenticated: true,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        authenticated: false,
      };
    default:
      return state;
  }
};

export default todos;
