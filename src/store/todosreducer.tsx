import * as actionTypes from "./actionTypes";

interface ReducerState {
  authenticated: boolean;
}

const initialState: ReducerState = {
  authenticated: false,
};

interface AuthAction {
  type: string;
  user: string;
  pass: string;
}

const todos = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      console.log(action.user, action.pass);
      return {
        ...state,
        authenticated: true,
      };
  }
  return state;
};

export default todos;
