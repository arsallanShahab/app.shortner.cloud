import * as React from "react";

import { cn } from "@/lib/utils";
import { Sora } from "next/font/google";
import { twMerge } from "tailwind-merge";

const sora = Sora({ subsets: ["latin"] });

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        "flex border border-input file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline disabled:cursor-not-allowed disabled:opacity-50 input px-4 py-2.5 text-sm w-full focus:text-primary focus:bg-secondary-light bg-secondary-lighter hover:bg-secondary-light rounded-lg border-none outline-none focus:outline-none focus:ring-2 focus:ring-white/25 duration-150",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
