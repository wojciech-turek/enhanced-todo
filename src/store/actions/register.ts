import * as actionTypes from "../actionTypes";
import axios from "axios";

export const regStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const regSuccess = (token: string, userId: string) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    idToken: token,
    userId: userId,
    authenticated: true,
  };
};

export const regFail = (error: any) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    regError: error,
    authenticated: false,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: string) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, 3600 * 100);
  };
};

export const signup = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(regStart());
    axios({
      method: "post",
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      data: {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    })
      .then((response) => {
        dispatch(regSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(regFail(error.response.data.error.message));
      });
  };
};
