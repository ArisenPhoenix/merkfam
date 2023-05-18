import { REMOVE_FROM_LOCAL_STORAGE } from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";

export const defaultAuthData = {
  isLoggedIn: false,
  isAdmin: false,
  isPatient: false,
  isWorker: false,
  userType: "",
  first_name: "",
  last_name: "",
  username: "",
  userId: "",
};

export const defaultUserData = {
  first_name: "",
  last_name: "",
  job: "",
  username: "",
  userId: "",
  currentUserPage: "",
  currentUserData: {},
};

export const logoutUser = (setLoggingOut, setUserData, setAuthData) => {
  setLoggingOut(true);
  setUserData(defaultUserData);
  setAuthData(defaultAuthData);
};

export const removeUserDataFromStorage = () => {
  REMOVE_FROM_LOCAL_STORAGE("auth");
  REMOVE_FROM_LOCAL_STORAGE("userData");
};

export const CHECK_LOGIN_INFO = (data) => {
  if (!data) {
    return false;
  }
  const job = data && data.job;
  const specialty = data && data.specialty;
  const o = {
    userId: data.userId,
    isAdmin: data.isAdmin,
    isUser: data.isUser,
    userName: data.userName,
    first_name: data.first_name,
    last_name: data.last_name,
  };

  return o;
};

export const SET_USER_INFO = (res, setUserData, setAuthData) => {
  if (res.ok) {
    const data = res.response.rows[0];
    const isLoginValid = CHECK_LOGIN_INFO(data);
    if (isLoginValid) {
      setUserData(data);
      setAuthData(isLoginValid);
    }

    return isLoginValid;
  }
};
