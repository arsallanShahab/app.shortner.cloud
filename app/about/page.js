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
            {/* generate tag line for about page */}
            <span className="color-effect">About</span> the project
          </h1>
        </div>
        <div className="mb-8">
          <p className="font-inter text-lg max-w-2xl mx-auto">
            I am the sole creator behind this app, working diligently to bring
            you a high-quality product. I am passionate about what I do and
            dedicated to improving the app day by day. Your support and feedback
            are greatly appreciated as I continue to enhance and refine the user
            experience. Stay tuned for updates and enjoy using the app. Thank
            you for being a part of this journey.
          </p>
        </div>
      </div>
    </div>
  );
}
