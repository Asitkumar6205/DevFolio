import { useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";

export function Page2() {
  const isMobile = useIsMobile();
  const page2Ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={page2Ref} className="relative h-screen w-screen bg-background">
      <div
        className={`absolute ${
          isMobile ? "top-[20%] left-[5%] right-[5%]" : "top-[30%] left-[10%]"
        }`}
      >
        <h3 className="text-muted-foreground font-normal">About Us</h3>
        <h1
          className={`leading-relaxed text-foreground ${
            isMobile ? "text-4xl sm:text-5xl" : "text-6xl"
          }`}
        >
          Innovation
          <br />
          Meets Design
        </h1>
      </div>

      <div
        className={`${
          isMobile
            ? "absolute top-[55%] left-[5%] right-[5%] text-left"
            : "absolute top-[55%] right-[10%] text-right"
        }`}
      >
        <p
          className={`text-muted-foreground font-normal ${
            isMobile ? "text-sm leading-relaxed" : "max-w-md"
          }`}
        >
          We are a creative agency focused on delivering exceptional digital
          experiences through innovative design and cutting-edge technology.
        </p>
      </div>
    </div>
  );
}
