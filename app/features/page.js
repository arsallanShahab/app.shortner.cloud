import { cn } from "@/lib/utils";
import { Lock, PieChart, QrCode } from "lucide-react";

export default function Page() {
  return (
    <div className="font-sora flex flex-col items-center text-center justify-center w-full pt-32 pb-24 px-6 sm:px-10">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-20 max-w-4xl">
          <h1
            className={cn(
              "text-7xl sm:text-8xl font-bold tracking-tighter break-all sm:break-keep"
            )}
          >
            <span className="color-effect">Featurefull</span> Link Shortner
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 place-items-center gap-10 md:grid-cols-2 w-full">
          <div className="relative w-full z-20 group flex flex-col items-start justify-center p-8 rounded-xl">
            <div className="absolute group-hover:z-10 z-30 group-hover:w-full rounded-3xl right-4 top-4 group-hover:h-full group-hover:right-0 group-hover:top-0 group-hover:rounded-xl  duration-200 sm:-top-4 sm:-right-4 bg-[#ecf976] w-16 h-16 p-5 flex items-start justify-end">
              <QrCode className="w-6 h-6" />
            </div>
            <div className="mt-4 text-left relative z-20 w-full">
              <h1 className="font-bold text-xl scale-150 translate-x-5 group-hover:translate-x-0 inline-block group-hover:scale-100 translate-y-4 group-hover:translate-y-0 duration-150">
                QR Code
              </h1>
              <p className="font-inter group-hover:opacity-100 group-hover:translate-y-0 duration-150 opacity-0 -translate-y-3 text-sm font-medium max-w-[200px] mt-1">
                Generate QR code for your short link
              </p>
            </div>
          </div>
          <div className="relative w-full z-20 group flex flex-col items-start justify-center p-8 rounded-xl">
            <div className="absolute right-4 top-4 group-hover:z-10 z-30 group-hover:w-full rounded-3xl group-hover:h-full group-hover:right-0 group-hover:top-0 group-hover:rounded-xl  duration-200 sm:-top-4 sm:-right-4 bg-[#ecf976] w-16 h-16 p-5 flex items-start justify-end">
              <PieChart className="w-6 h-6" />
            </div>
            <div className="mt-4 text-left relative z-20 w-full">
              <h1 className="font-bold text-xl scale-150 translate-x-5 group-hover:translate-x-0 inline-block group-hover:scale-100 translate-y-4 group-hover:translate-y-0 duration-150">
                Analytics
              </h1>
              <p className="font-inter group-hover:opacity-100 group-hover:translate-y-0 duration-150 opacity-0 -translate-y-3 text-sm font-medium max-w-[200px] mt-1">
                Get realtime analytics of your short link
              </p>
            </div>
          </div>
          <div className="relative w-full z-20 group flex flex-col items-start justify-center p-8 rounded-xl">
            <div className="absolute right-4 top-4 group-hover:z-10 z-30 group-hover:w-full rounded-3xl group-hover:h-full group-hover:right-0 group-hover:top-0 group-hover:rounded-xl  duration-200 sm:-top-4 sm:-right-4 bg-[#ecf976] w-16 h-16 p-5 flex items-start justify-end">
              <Lock className="w-6 h-6" />
            </div>
            <div className="mt-4 text-left relative z-20 w-full">
              <h1 className="font-bold text-xl scale-150 translate-x-5 group-hover:translate-x-0 inline-block group-hover:scale-100 translate-y-4 group-hover:translate-y-0 duration-150">
                Privacy
              </h1>
              <p className="font-inter group-hover:opacity-100 group-hover:translate-y-0 duration-150 opacity-0 -translate-y-3 text-sm font-medium max-w-[200px] mt-1">
                {/* use expiration  */}
                Set expiration date for your short link
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
