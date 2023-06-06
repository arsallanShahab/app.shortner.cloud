"use client";

import { createContext, useContext } from "react";

const globalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  return <globalContext.Provider>{children}</globalContext.Provider>;
};

const useGlobalContext = () => useContext(globalContext);

export { GlobalContextProvider, useGlobalContext };
