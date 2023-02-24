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
    isAdmin:
      job === "Owner" ||
      job === "Software Engineer" ||
      job === "Web Dev" ||
      job === "WebDev" ||
      specialty === "Web Dev" ||
      specialty === "Software Engineer" ||
      specialty === "WebDev",
    isPatient: job === "Patient",
    isWorker:
      job === "Owner" ||
      job === "Doctor" ||
      job === "Software Engineer" ||
      job === "Nurse" ||
      job === "Driver" ||
      job === "WevDev" ||
      job === "Software Engineer" ||
      job === "Web Dev",
    userType: job,
    first_name: data.first_name,
    last_name: data.last_name,
    userId: data[`${job.toLowerCase()}_id`],
    id_string: `${job.toLowerCase()}_id`,
    isLoggedIn:
      data.job &&
      data.first_name &&
      data.last_name &&
      data[`${job.toLowerCase()}_id`] &&
      true,
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
