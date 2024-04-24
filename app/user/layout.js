import { cn } from "@/lib/utils";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div
      className={cn(
        "font-sora grid sm:h-[85vh] lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 items-start max-w-7xl mx-auto"
      )}
    >
      <div className="pt-20 h-full pb-16 sm:py-0 px-5 sm:px-14 flex flex-col justify-center items-center sm:items-start gap-5">
        <h1
          className={cn(
            "text-6xl sm:text-8xl text-center sm:text-left font-bold tracking-tighter"
          )}
        >
          <span className="color-effect inline-block">Shorten</span> your links
        </h1>
        <p className={"font-inter text-lg text-center sm:text-left max-w-md"}>
          Build and protect your brand using powerful, recognizable short links.
        </p>
      </div>
      <div className="h-full pb-20 sm:py-0 flex items-center px-5 sm:pl-14 sm:pr-7">
        {children}
      </div>
    </div>
  );
};

export default Layout;
