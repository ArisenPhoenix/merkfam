import React, { createContext, useEffect, useState } from "react";
import { userSchema } from "../../../../schemas.ts";
import SQL_TABLE from "../../../SQL/OBJECT_CLASS/SQL.ts";
import { 
    REMOVE_FROM_LOCAL_STORAGE,
	RETREIVE_FROM_LOCAL_STORAGE,
	SAVE_TO_LOCAL_STORAGE,
} from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";
import { useRouter } from "next/router";
import {
	defaultUserData,
	logoutUser,
    loginUser
} from "./helpers.ts";

import useToggle from "../../../hooks/Toggle";
 
export const USER_CONTEXT = createContext({
    isLoggedIn: false,
    isAdmin: false,
    isUser: false,
    first_name: "",
    last_name: "",
    userId: "",
    currentUserPage: "", 
    isPrinting: false,
    toggleIsPrinting: () => {},
    logoutUser: () => {},
    login: async () => {},
    saveLastPageData: () => {},
    getLastPageData: () => {},
});

export const USER_CONTEXT_PROVIDER = (props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(defaultUserData);
    const [loggingOut, toggleIsLoggingOut] = useToggle(false);
    const [isPrinting, toggleIsPrinting] = useToggle(false);
    const [lastPageData, setLastPageData] = useState({})

    const saveData = {
        userData: userData,
        lastPageData: lastPageData,
    }
    const getLastPageData = () => {
        const user = RETREIVE_FROM_LOCAL_STORAGE(userData.username)
        setLastPageData(user.lastPageData)
    }

    const saveLastPageData = (pageData) => {
        setLastPageData(pageData)
        const dataToSave = {...saveData, lastPageData: pageData}
        SAVE_TO_LOCAL_STORAGE(dataToSave, userData.username)
        SAVE_TO_LOCAL_STORAGE(dataToSave, "last_user")
    }

    const login = async(email, password) => {
        return await loginUser(email, password, setUserData)
    }

    const logout = () => {
        logoutUser(toggleIsLoggingOut, setUserData);
    };

    const user_value = {
        logoutUser: logout,
        login: login,
        userData: userData,
        toggleIsPrinting: toggleIsPrinting,
        isPrinting: isPrinting,
        lastPageData: lastPageData,
        getLastPageData: getLastPageData,
        saveLastPageData: saveLastPageData,
    };

    useEffect(() => {
        if (loggingOut) {
            REMOVE_FROM_LOCAL_STORAGE(userData.username)
            REMOVE_FROM_LOCAL_STORAGE("last_user")
            toggleIsLoggingOut(false);
        } else if (userData.isLoggedIn) {
            SAVE_TO_LOCAL_STORAGE(saveData, userData.username);
            REMOVE_FROM_LOCAL_STORAGE("last_user")
        } else if (user_value.isLoggedIn && !loggingOut) {
            const retreivedUserData = RETREIVE_FROM_LOCAL_STORAGE("last_user");
            if (retreivedUserData) {
                setUserData(retreivedUserData);
            } else {
                router.push("/login");
            }
        }

    }, [user_value.isLoggedIn, loggingOut]);
    return (
    <USER_CONTEXT.Provider value={user_value}>
        {props.children}
    </USER_CONTEXT.Provider>
    );
};

export default USER_CONTEXT;
