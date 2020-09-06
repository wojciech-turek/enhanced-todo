import * as actionTypes from "../actionTypes";
import axios from "axios";

export const loginRequest = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const loginSuccess = (response: Response) => {
  console.log(response);
  return {
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const loginFail = (error: Error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    authError: error,
  };
};

export const login = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(loginRequest());
    axios({
      method: "post",
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      data: {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    })
      .then((response) => {
        dispatch(loginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginFail(error.response.data.error.message));
      });
  };
};
