import { cn } from "@/lib/utils";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className={cn("font-sora grid lg:grid-cols-2 items-start")}>
      <div className="h-screen px-14 flex flex-col justify-center items-start gap-5">
        <h1 className={cn("text-8xl font-bold tracking-tighter")}>
          <span className="color-effect block">Shorten</span> your links
        </h1>
        <p className={"font-inter text-lg max-w-md"}>
          Build and protect your brand using powerful, recognizable short links.
        </p>
      </div>
      <div className="h-screen flex items-center">{children}</div>
    </div>
  );
};

export default Layout;
