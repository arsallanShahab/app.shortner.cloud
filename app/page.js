"use client";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const handleShorten = () => {
    if (!session || status === "unauthenticated") {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to shorten links",
        status: "error",
      });
      return router.push("/user/login");
    }
    router.push("/dashboard");
  };
  return (
    <>
      <main
        className={cn(
          "font-sora flex flex-col items-center text-center justify-center pt-40 pb-16 px-6 sm:px-10"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className={cn("mb-4")}>
            <h1
              className={cn(
                "text-7xl sm:text-8xl font-bold tracking-tighter break-all sm:break-keep"
              )}
            >
              <span className="color-effect">Shorten</span> your links
            </h1>
          </div>
          <div className={cn("mb-8")}>
            <p className="font-inter text-lg">
              Build and protect your brand using powerful, recognizable short
              links.
            </p>
          </div>
          <div className="flex flex-row sm:flex-col gap-4 md:flex-row w-full items-center justify-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Enter your link"
                className="input__primary w-full"
              />
            </div>

            <button
              onClick={handleShorten}
              className="button button__primary font-inter"
            >
              Shorten
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
