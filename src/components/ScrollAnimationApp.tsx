import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeSelector } from "@/components/ThemeSelector";
import AkLogo from "./Aklogo";

// Mobile hook
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const ScrollAnimationApp: React.FC = () => {
  const { currentTheme } = useTheme();
  const isMobile = useIsMobile();
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  const generateImagePaths = (): string[] => {
    const paths: string[] = [];
    for (let i = 1; i <= 300; i++) {
      const paddedNumber = i.toString().padStart(4, "0");
      paths.push(`/male${paddedNumber}.png`);
    }
    return paths;
  };

  const setupLocomotiveScroll = () => {
    // Note: This is a simplified version without LocomotiveScroll
    // You would need to install locomotive-scroll separately if needed
    // For now, we'll use native scroll with GSAP ScrollTrigger

    ScrollTrigger.refresh();
  };

  const setupCanvasAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const imagePaths = generateImagePaths();
    const frameCount = 300;
    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 1 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = imagePaths[i];
      images.push(img);
    }

    const scaleImage = (
      img: HTMLImageElement,
      ctx: CanvasRenderingContext2D
    ) => {
      const canvas = ctx.canvas;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    const render = () => {
      if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
        scaleImage(images[imageSeq.frame], context);
      }
    };

    // Initial render when first image loads
    images[1].onload = render;

    // GSAP animation for image sequence - adjust scroll distance for mobile
    const scrollEnd = isMobile ? "400% top" : "600% top";

    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top top",
        end: scrollEnd,
        scrub: isMobile ? 0.1 : 0.15,
        onUpdate: render,
      },
    });

    // Pin canvas during scroll
    ScrollTrigger.create({
      trigger: pageRef.current,
      pin: true,
      start: "top top",
      end: scrollEnd,
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  };

  const setupPageAnimations = () => {
    // Pin page sections
    [page1Ref, page2Ref, page3Ref].forEach((pageRef) => {
      if (pageRef.current) {
        gsap.to(pageRef.current, {
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
          },
        });
      }
    });
  };

  useEffect(() => {
    setupLocomotiveScroll();
    const cleanupCanvas = setupCanvasAnimation();
    setupPageAnimations();

    return () => {
      if (cleanupCanvas) cleanupCanvas();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      id="main"
      ref={mainRef}
      className="relative overflow-hidden bg-background text-foreground"
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 h-20 z-[99] flex items-center justify-between ${
          isMobile ? "h-[8vh] px-4" : "h-[7vh] px-8"
        }`}
      >
        {/* <h3 className={`font-normal text-foreground ${isMobile ? 'text-lg' : 'text-xl'}`}>
          Brand
        </h3> */}
        <div className={`w-10 h-10 ${isMobile ? "" : "md:w-12 md:h-12"}`}>
          <AkLogo />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {!isMobile && <ThemeSelector />}
          {/* <Button className={`bg-primary text-primary-foreground rounded-full border-none hover:bg-primary/90 transition-colors ${
            isMobile ? 'px-3 py-1.5 text-sm' : 'px-5 py-2'
          }`}>
            Contact
          </Button> */}
          {isMobile && (
            <div className="ml-2">
              <ThemeSelector />
            </div>
          )}
        </div>
      </nav>

      {/* Main Page with Canvas */}
      <div ref={pageRef} className="relative h-screen w-screen bg-background">
        <canvas
          ref={canvasRef}
          className="relative z-10 max-w-full max-h-full"
        />

        {/* Scrolling Text Loop */}
        <div
          className={`absolute w-full flex whitespace-nowrap overflow-hidden ${
            isMobile
              ? "top-[25%] h-[20%] text-4xl sm:text-5xl"
              : "top-[30%] h-[25%] text-8xl"
          }`}
        >
          <h1 className="font-normal animate-scroll-left text-foreground">
            FUTURE VISION{" "}
            <span className="text-transparent font-medium stroke-text">
              FUTURE VISION
            </span>
          </h1>
        </div>

        <h3
          className={`absolute font-normal text-muted-foreground ${
            isMobile ? "top-[50%] left-[5%] text-sm" : "top-[55%] left-[5%]"
          }`}
        >
          Creative Agency
        </h3>
        <h4
          className={`absolute font-medium text-foreground ${
            isMobile ? "top-[55%] left-[5%] text-base" : "top-[62%] left-[25%]"
          }`}
        >
          Based in Bengaluru
        </h4>
      </div>

      {/* Page 1 */}
      <div ref={page1Ref} className="relative h-screen w-screen bg-background">
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

      {/* Page 2 */}
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

      {/* Page 3 */}
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

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 15s linear infinite;
        }
        
        .stroke-text {
          -webkit-text-stroke: 1.2px hsl(var(--foreground));
          text-stroke: 1.2px hsl(var(--foreground));
        }
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>
    </div>
  );
};
