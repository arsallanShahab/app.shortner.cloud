"use client";

import { GlobalContextProvider } from "@/context/GlobalContext";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </SessionProvider>
  );
};

export default Provider;
