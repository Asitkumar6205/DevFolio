import { useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";


export function Page3() {
    const isMobile = useIsMobile();
    const page3Ref = useRef<HTMLDivElement>(null);

    return(
        <div ref={page3Ref} className="relative h-screen w-screen bg-background">
        <div
          className={`absolute ${
            isMobile
              ? "top-[30%] left-[5%] right-[5%] text-center"
              : "top-[40%] right-[10%] text-right"
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
          {/* Image positioned at the bottom center of this div */}
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