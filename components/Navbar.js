"use client";
import { Loader2, MoonIcon, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const dropdown = React.useRef(null);
  const router = useRouter();

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
  }, [router.pathname]);

  return (
    <div className={"flex justify-between px-10 max-w-full xl:mx-auto py-5"}>
      <div>
        <Link
          href={"/"}
          className="font-sora text-2xl font-bold tracking-tighter"
        >
          shortner
        </Link>
      </div>
      <div className="flex items-center gap-6">
        {session ? (
          <div className="relative">
            <button
              ref={dropdown}
              className="button button__primary"
              onClick={() => setOpen(!open)}
            >
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-6 h-6 rounded-full mr-2 inline-block"
                  width={64}
                  height={64}
                />
              )}
              {session.user.name}
            </button>
            {open && (
              <div className="absolute top-12 w-full bg-secondary-lighter backdrop-blur-md rounded-lg p-2">
                <div className="flex flex-col">
                  <Link
                    className="px-2 py-2 rounded-lg hover:bg-secondary-light text-sm font-medium"
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
          <Link href="/user/login" className="button button__primary">
            {status == "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : status == "unauthenticated" ? (
              "login"
            ) : null}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
