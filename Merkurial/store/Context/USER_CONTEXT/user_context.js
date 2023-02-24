import React, { createContext, useEffect, useState } from "react";
import { GET_USER } from "../../../SQL/QUERIES/Row/GET_ROW";
import {
  RETREIVE_FROM_LOCAL_STORAGE,
  SAVE_TO_LOCAL_STORAGE,
} from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";
import { useRouter } from "next/router";
import {
  defaultAuthData,
  defaultUserData,
  logoutUser,
  removeUserDataFromStorage,
  SET_USER_INFO,
} from "./helpers";
import useToggle from "../../../hooks/Toggle";

const USER_CONTEXT = createContext({
  isLoggedIn: false,
  isAdmin: false,
  isPatient: false,
  isWorker: false,
  userType: "",
  first_name: "",
  last_name: "",
  job: "",
  userId: "",
  userData: {},
  currentUserPage: "",
  currentUserData: {},
  isPrinting: Boolean,
  clinics: [],
  doctors: [],
  nurses: [],
  drivers: [],
  lastWorkType: "",
  toggleIsPrinting: () => {},
  logoutUser: () => {},
  loginUser: async () => {},
  saveLastWorkType: () => {},
  getLastWorkType: () => {},
});

export const USER_CONTEXT_PROVIDER = (props) => {
  const router = useRouter();
  const [authData, setAuthData] = useState(defaultAuthData);
  const [userData, setUserData] = useState(defaultUserData);
  const [loggingOut, toggleIsLoggingOut, setLoggingOut] = useToggle(false);
  const [isPrinting, toggleIsPrinting, setIsPrinting] = useToggle(false);
  const [lastWorkTYpe, setLastWorkType] = useState("");
  const [getLastFormState, setGetLastForm] = useState(false);

  const loginUser = async (userInfo, setErrorMessage) => {
    const args = {
      tableName: `${userInfo.job.toLowerCase()}`,
      userInfo: userInfo,
    };
    const res = await GET_USER(args);
    if (res.ok) {
      const isValid = SET_USER_INFO(res, setUserData, setAuthData);
      if (!isValid) {
        setErrorMessage("Check Your Details Again.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      return isValid;
    }
  };

  const saveLastForm = (formName) => {
    SAVE_TO_LOCAL_STORAGE("lastWorkType", formName);
    // console.log("SAVED LAST FORM: ", formName);
  };

  const getLastForm = () => {
    setGetLastForm(true);
  };

  const logout = () => {
    logoutUser(setLoggingOut, setUserData, setAuthData);
  };

  const worker_value = {
    logoutUser: logout,
    loginUser: loginUser,
    userData: userData,
    isAdmin: authData.isAdmin,
    isWorker: authData.isWorker,
    isPatient: authData.isPatient,
    isLoggedIn: authData.isLoggedIn,
    first_name: authData.first_name,
    last_name: authData.last_name,
    userId: authData.userId,
    userType: authData.userType,
    job: userData.job,
    toggleIsPrinting: toggleIsPrinting,
    isPrinting: isPrinting,
    clinics: clinics,
    doctors: doctors,
    nurses: nurses,
    drivers: [],
    lastWorkType: lastWorkTYpe,
    saveLastWorkType: saveLastForm,
    getLastWorkType: getLastForm,
  };

  useEffect(() => {
    if (getLastFormState) {
      const previousForm = RETREIVE_FROM_LOCAL_STORAGE("lastWorkType");
      setLastWorkType(previousForm);
      setGetLastForm(false);
    }
  }, []);

  useEffect(() => {
    if (loggingOut) {
      removeUserDataFromStorage();
      toggleIsLoggingOut();
      router.push("/login");
    }
    if (worker_value.isLoggedIn) {
      SAVE_TO_LOCAL_STORAGE(worker_value, "auth");
      SAVE_TO_LOCAL_STORAGE(userData, "userData");
    }
    if (!worker_value.isLoggedIn) {
      const retreivedAuthData = RETREIVE_FROM_LOCAL_STORAGE("auth");
      const retreivedUserData = RETREIVE_FROM_LOCAL_STORAGE("userData");
      if (retreivedUserData && retreivedUserData.district) {
        if (retreivedAuthData && retreivedAuthData.isLoggedIn) {
          setUserData(retreivedUserData);
          setAuthData(retreivedAuthData);
        } else {
          router.push("/login");
        }
      }
    }
  }, [userData.first_name, worker_value.isLoggedIn, loggingOut]);
  return (
    <USER_CONTEXT.Provider value={worker_value}>
      {props.children}
    </USER_CONTEXT.Provider>
  );
};

export default USER_CONTEXT;
