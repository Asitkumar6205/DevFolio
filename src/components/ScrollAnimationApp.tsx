import { Navbar } from "@/layouts/Navbar";
import { CanvasAnimation } from "@/animations/CanvasAnimation";
import { Page1 } from "@/sections/Page1";
import { Page2 } from "@/sections/Page2";
import { Page3 } from "@/sections/Page3";
import { HeroSection } from "../sections/HeroSection";

export const ScrollAnimationApp = () => {
  return (
    <div id="main" className="relative overflow-hidden bg-background text-foreground">
      <Navbar />
      
      {/* Container for overlapping sections */}
      <div className="relative">
        {/* CanvasAnimation behind */}
        <CanvasAnimation />
        
        {/* HeroSection in front */}
        <HeroSection />
      </div>
      
      <Page1 />
      <Page2 />
      <Page3 />
    </div>
  );
};