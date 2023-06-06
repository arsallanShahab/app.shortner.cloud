"use client";

import { GlobalContextProvider } from "@/context/GlobalContext";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
    <GlobalContextProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </GlobalContextProvider>
  );
};

export default Provider;
