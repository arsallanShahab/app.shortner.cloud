"use client";

import { createContext, useContext, useEffect } from "react";

const globalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);
  return (
    <globalContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {children}
    </globalContext.Provider>
  );
};

const useGlobalContext = () => useContext(globalContext);

export { GlobalContextProvider, useGlobalContext };
