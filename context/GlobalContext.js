"use client";

import { createContext, useContext } from "react";

const Context = createContext();

const GlobalContextProvider = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

const useGlobalContext = () => useContext(Context);

export { GlobalContextProvider, useGlobalContext };
