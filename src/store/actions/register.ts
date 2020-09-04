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
    error: error,
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
      })
      .catch((error) => {
        dispatch(regFail(error.response.data.error.message));
      });
  };
};
