import { AUTH_SUCCESS, AUTH_LOGOUT } from "./actionType";
import axios from "axios";

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const AuthData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpocruHe0SzMs6Hre5GFcfoR4nQqmuxOU";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpocruHe0SzMs6Hre5GFcfoR4nQqmuxOU";
    }

    const response = await axios.post(url, AuthData);

    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}
export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, time * 1000);
  };
}
export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
}
export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logOut());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}
