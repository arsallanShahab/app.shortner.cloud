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
            We are a team of 2 people, who are passionate about building things
            that people love. We are currently working on this project and we
            are trying to make it better day by day.
          </p>
        </div>
      </div>
    </div>
  );
}
