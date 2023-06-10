import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="font-sora flex flex-col items-center text-center justify-center pt-40 pb-16 px-6 sm:px-10">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-4">
          <h1
            className={cn(
              "text-7xl sm:text-8xl font-bold tracking-tighter break-all sm:break-keep"
            )}
          >
            <span className="color-effect">Free,</span> Yet Powerful
          </h1>
        </div>
        <div className="mb-8">
          <p className="font-inter text-lg max-w-2xl mx-auto">
            yeah you heard it right, it&apos;s free for now, but we&apos;ll add
            a premium plan soon. so till then enjoy the free service.
          </p>
        </div>
      </div>
    </div>
  );
}
