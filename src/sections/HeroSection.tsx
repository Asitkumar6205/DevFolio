import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileUser, FileUserIcon, Github, Link, Linkedin, Mail } from "lucide-react";
import { TextRevealAnimation } from "@/animations/TextRevealAnimation";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const fullText =
    "All-rounder dev magician✨ — turnin bugs into features, deadlines into jokes, and ideas into apps that people actually vibe with.";
  const visiblePortion = "All-Rounder dev magician✨";

  // Verify the visible portion matches the start of full text
  console.log(
    "Does full text start with visible portion?",
    fullText.startsWith(visiblePortion)
  );
  console.log("Visible portion length:", visiblePortion.length);
  console.log(
    "First",
    visiblePortion.length,
    "chars of full text:",
    fullText.substring(0, visiblePortion.length)
  );

  return (
    <div
      id="hero"
      ref={heroRef}
      className="absolute inset-0 z-30 w-screen h-screen pointer-events-none"
    >
      {/* Remove the canvas from HeroSection since CanvasAnimation handles it */}

      <div className="fixed inset-0 flex flex-col justify-center items-start text-left px-8 md:px-16 lg:px-24 pointer-events-auto">
        <div className={`${isMobile ? "space-y-2" : "space-y-3"}`}>
          <h1
            className={`font-bold hero-text ${
              isMobile ? "text-2xl sm:text-3xl" : "text-5xl"
            }`}
          >
            Hi! I'm
          </h1>
          <h1
            className={`font-bold shuriken text-primary hero-text ${
              isMobile ? "text-4xl sm:text-5xl" : "text-8xl"
            }`}
          >
            Asit K.
          </h1>
          <h2
            className={`font-normal squidgame text-secondary text-glow ${
              isMobile ? "text-xl sm:text-2xl" : "text-3xl"
            }`}
          >
            Full Stack Soft ENgg
          </h2>

          <TextRevealAnimation
            text={fullText}
            visiblePortion={visiblePortion}
            className={`text-secondary-foreground/60 bytebounce font-bold max-w-md mx-auto ${
              isMobile ? "text-base px-4" : "text-4xl"
            }`}
          />

          <div
            className={`flex items-center gap-6 ${isMobile ? "mt-6" : "mt-8"}`}
          >
            <div className="flex gap-6">
              <a
                href="https://github.com/Asitkumar6205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/asit-kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://drive.google.com/file/d/1PD45cYoi9CbcFY3wm3OGJeo00t7Umd8Y/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FileUserIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Skills */}
      {/* <div className="absolute top-[20%] left-[10%] z-40 hidden lg:block pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
          <span className="text-sm text-muted-foreground">
            React • TypeScript
          </span>
        </div>
      </div>
      <div className="absolute top-[70%] right-[15%] z-40 hidden lg:block pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
          <span className="text-sm text-muted-foreground">
            Node.js • Python
          </span>
        </div>
      </div> */}
    </div>
  );
}
