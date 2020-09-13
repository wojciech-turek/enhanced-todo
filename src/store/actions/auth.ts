import * as actionTypes from "../actionTypes";
import axios from "axios";

export const loginRequest = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const loginSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    authenticated: true,
  };
};

export const loginFail = (error: Error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    authError: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        dispatch(loginSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(loginFail(error.response.data.error.message));
      });
  };
};
