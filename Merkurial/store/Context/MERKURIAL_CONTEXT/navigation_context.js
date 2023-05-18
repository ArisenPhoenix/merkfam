import React, { createContext, useState } from "react";
import { SAVE_TO_LOCAL_STORAGE, RETREIVE_FROM_LOCAL_STORAGE } from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";
import { useEffect } from "react";

const NAVIGATION_CONTEXT = createContext({
    currentPage: {text: "", href: ""},
    setCurrentPage: (text) => {() => {
        () => {text}
    }}
  });

export default NAVIGATION_CONTEXT


export const NAVIGATION_CONTEXT_PROVIDER = (props) => {
    const template = {text: "", href: ""}
    const [currentPage, setCurrentPageData] = useState(template)
    const setCurrentPage = (p) => {
        SAVE_TO_LOCAL_STORAGE(p, "LastPage")
        setCurrentPageData(p)
    }

    useEffect(() => {
        if (currentPage.text === ""){
            const lastPage = RETREIVE_FROM_LOCAL_STORAGE("LastPage")
            lastPage && setCurrentPageData(lastPage)
        }
    }, [])

    const navigationContext = {
        currentPage: currentPage,
        setCurrentPage: setCurrentPage
    }

    return (
        <NAVIGATION_CONTEXT.Provider value={navigationContext}>
            {props.children}
        </NAVIGATION_CONTEXT.Provider>
    )
}