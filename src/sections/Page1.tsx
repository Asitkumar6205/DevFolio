import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";

export function Page1() {
  const isMobile = useIsMobile();
  const page1Ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={page1Ref} className="relative h-screen w-screen bg-muted">
      <div
        className={`absolute ${
          isMobile ? "top-[20%] left-[5%] right-[5%]" : "top-[30%] left-[10%]"
        }`}
      >
        <h3 className="font-normal text-muted-foreground">Our Services</h3>
        <h1
          className={`leading-relaxed text-foreground ${
            isMobile ? "text-3xl sm:text-4xl" : "text-5xl"
          }`}
        >
          We Create
          <br />
          Amazing Experiences
        </h1>
      </div>

      <div
        className={`absolute text-right ${
          isMobile
            ? "top-[50%] left-[5%] right-[5%] text-left"
            : "top-[50%] right-[10%]"
        }`}
      >
        <h1
          className={`leading-relaxed text-foreground ${
            isMobile ? "text-3xl sm:text-4xl" : "text-5xl"
          }`}
        >
          Digital Solutions
          <br />
          For Modern World
        </h1>
        <h3 className="text-muted-foreground font-normal">
          Excellence in Design
        </h3>
      </div>
    </div>
  );
}
