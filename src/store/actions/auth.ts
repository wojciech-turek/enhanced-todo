import * as actionTypes from "../actionTypes";
import axios from "axios";

export const loginRequest = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const loginSuccess = (authData: { username: string; pass: string }) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const loginFail = (error: Error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const login = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(loginRequest());
    axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAYOVrzqWn9mTTpDL2eTaQSKFQssHOG34U"
    );
  };
};
