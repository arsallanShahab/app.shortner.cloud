"use client";
import { cn } from "@/lib/utils";
import {
  Loader2,
  Menu,
  MenuIcon,
  MenuSquare,
  MoonIcon,
  PanelTopOpen,
  Sun,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const dropdown = React.useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown.current &&
        dropdown.current.nextSibling?.contains(event.target)
      ) {
        return;
      }
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target) &&
        open
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={"flex justify-between items-center px-10 w-full py-5"}>
      <div className="flex items-center justify-start gap-10">
        <Link
          href={"/"}
          className="font-sora text-2xl font-bold tracking-tighter"
        >
          shortner
        </Link>
        <div className="hidden sm:flex gap-3 items-center justify-start">
          {/* check which is active */}
          {[
            { name: "home", path: "/" },
            { name: "features", path: "/features" },
            { name: "pricing", path: "/pricing" },
            { name: "about", path: "/about" },
          ].map((item, index) => {
            const isActive = pathname == item.path;
            if (pathname == "/dashboard") {
              return null;
            }
            return (
              <Link
                key={index}
                href={item.path}
                className={`font-inter text-sm font-semibold px-3 py-1.5 rounded-3xl ${
                  isActive ? "bg-[#ecf976]" : "text-primary"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {session ? (
          <div className="relative">
            <button
              ref={dropdown}
              className=" text-xs font-medium px-2 py-2 rounded-3xl duration-150 button__primary"
              onClick={() => setOpen(!open)}
            >
              {session.user.image ? (
                <div className="flex justify-center items-center">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-6 h-6 rounded-full sm:mr-2 inline-block"
                    width={64}
                    height={64}
                  />
                  <span className={cn("hidden sm:inline-block sm:pr-2")}>
                    {session.user.name}
                  </span>
                </div>
              ) : (
                <span className={cn("hidden sm:inline-block px-2")}>
                  {session.user.name}
                </span>
              )}

              <div
                className="flex sm:hidden items-center justify-center text-xs font-medium px-2 py-2 rounded-3xl duration-150"
                onClick={() => {
                  document.documentElement.classList.toggle("dark");
                }}
              >
                <PanelTopOpen className="h-5 w-5" />
              </div>
            </button>
            {open && (
              <div className="absolute top-12 w-[150px] right-0 sm:w-full bg-secondary-button backdrop-blur-md rounded-xl border border-black/[.025] p-2">
                <div className="flex flex-col">
                  <div className="flex sm:hidden flex-col">
                    {[
                      { name: "home", path: "/" },
                      { name: "features", path: "/features" },
                      { name: "pricing", path: "/pricing" },
                      { name: "about", path: "/about" },
                    ].map((item, index) => {
                      const isActive = pathname == item.path;
                      if (pathname == "/dashboard") {
                        return null;
                      }
                      return (
                        <Link
                          key={index}
                          href={item.path}
                          className={`px-2 py-2 rounded-lg hover:bg-secondary-light border border-transparent hover:border-black/[.025] text-sm font-medium`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    className="px-2 py-2 rounded-lg hover:bg-secondary-light border border-transparent hover:border-black/[.025] text-sm font-medium"
                    href="/dashboard"
                  >
                    dashboard
                  </Link>
                  <p
                    className="px-2 py-2 rounded-lg hover:bg-secondary-light text-sm font-medium cursor-pointer"
                    onClick={() => {
                      signOut({ redirect: true, callbackUrl: "/user/login" });
                    }}
                  >
                    logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            href={status == "unauthenticated" ? "/user/login" : "/dashboard"}
            className="text-xs font-medium px-2 py-2 rounded-3xl button__primary"
          >
            {status == "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status == "unauthenticated" ? (
              <span className="hidden sm:inline-block px-2">login</span>
            ) : null}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
