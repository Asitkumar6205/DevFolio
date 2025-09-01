import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <div
      id="hero"
      ref={heroRef}
      className="absolute inset-0 z-30 w-screen h-screen pointer-events-none"
    >
      {/* Remove the canvas from HeroSection since CanvasAnimation handles it */}
      
      <div className="fixed inset-0 flex flex-col justify-end items-baseline text-center px-4 pointer-events-auto">
        <div className={`${isMobile ? "space-y-2" : "space-y-3"}`}>
          <h1
            className={`font-bold hero-text ${
              isMobile ? "text-4xl sm:text-5xl" : "text-7xl"
            }`}
          >
            Hi! I'm Asit K.
          </h1>
          <h2
            className={`font-normal text-primary text-glow ${
              isMobile ? "text-xl sm:text-2xl" : "text-3xl"
            }`}
          >
            Full Stack Software Engineer
          </h2>
          {/* <p
            className={`text-muted-foreground max-w-2xl mx-auto ${
              isMobile ? "text-base px-4" : "text-lg"
            }`}
          >
            Crafting scalable web applications and digital experiences with
            modern technologies. Passionate about clean code, user experience,
            and building products that matter.
          </p> */}

          {/* <div
            className={`flex gap-4 justify-center ${
              isMobile ? "mt-6" : "mt-8"
            }`}
          >
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-accent rounded-full px-6 py-3"
            >
              View Projects
            </Button>
          </div> */}

          <div className="flex justify-center gap-6 mt-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Skills */}
      <div className="absolute top-[20%] left-[10%] z-40 hidden lg:block pointer-events-none">
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
      </div>
    </div>
  );
}