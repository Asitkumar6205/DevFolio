import { useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";

export function Page3() {
  const isMobile = useIsMobile();
  const page3Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={page3Ref}
      className="relative h-screen w-screen bg-background flex items-center justify-between px-8 md:px-16 lg:px-24"
    >
     
      <div className="flex-1">
        {/* Your About / left content goes here */}
      </div>

      {/* Right side: Contact / Work Together */}
      <div
        className={`flex-1 flex flex-col items-start pr-4 ${
          isMobile ? "text-center" : "items-end text-right"
        }`}
      >
        <h3 className="text-muted-foreground font-normal">Get In Touch</h3>
        <h1
          className={`text-foreground ${
            isMobile ? "text-5xl sm:text-6xl" : "text-7xl"
          }`}
        >
          Let's Work
          <br />
          Together
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mt-8">
          <img
            src="/assets/asit.png"
            className="h-40 w-40 rounded-full"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
}
