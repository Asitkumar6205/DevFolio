import { Navbar } from "@/layouts/Navbar";
import { CanvasAnimation } from "@/animations/CanvasAnimation";
import { Page1 } from "@/sections/Page1";
import { Page2 } from "@/sections/Page2";
import { Page3 } from "@/sections/Page3";
import { HeroSection } from "../sections/HeroSection";
import ScrollTextScroller from "../animations/ScrollTextScroller";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";

export const ScrollAnimationApp = () => {
  const [heroOpacity, setHeroOpacity] = useState(1);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroContainerRef.current || !page1Ref.current) return;
      
      const heroContainer = heroContainerRef.current;
      const page1Element = page1Ref.current;
      
      // Get positions
      const heroBottom = heroContainer.offsetTop + heroContainer.offsetHeight;
      const page1Top = page1Element.offsetTop;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate when Page1 starts entering viewport
      const page1EntersViewport = page1Top - windowHeight;
      const fadeDistance = windowHeight * 0.3; // Fade over 30% of viewport height
      
      if (scrollY <= page1EntersViewport) {
        setHeroOpacity(1);
      } else if (scrollY >= page1EntersViewport + fadeDistance) {
        setHeroOpacity(0);
      } else {
        // Linear interpolation
        const fadeProgress = (scrollY - page1EntersViewport) / fadeDistance;
        setHeroOpacity(Math.max(0, Math.min(1, 1 - fadeProgress)));
      }
    };

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial call to set correct state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return (
    <div id="main" className="relative overflow-hidden bg-background text-foreground">
      <Navbar />
      
      {/* Container for overlapping sections */}
      <div 
        ref={heroContainerRef}
        className="relative min-h-screen"
      >
        {/* CanvasAnimation behind */}
        <CanvasAnimation />
        
        {/* HeroSection and ScrollTextScroller with synchronized fade */}
        <div
          style={{ 
            opacity: heroOpacity,
            transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: heroOpacity < 0.1 ? 'none' : 'auto'
          }}
          className="absolute inset-0 z-30"
        >
          {/* HeroSection */}
          <HeroSection />
          
          {/* ScrollTextScroller positioned on the right side with full width */}
          <div className="absolute top-0 right-0 w-auto h-screen pointer-events-none overflow-visible" style={{ width: 'fit-content', minWidth: '40vw' }}>
            <div className="fixed top-0 right-4 h-screen pointer-events-auto overflow-visible" style={{ width: 'max-content', minWidth: '40vw' }}>
              <ScrollTextScroller />
            </div>
          </div>
        </div>

        {/* Left Arrow Icon Fixed at Right End Center of Screen */}
        <div 
          style={{ 
            opacity: heroOpacity,
            transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: heroOpacity < 0.1 ? 'none' : 'auto'
          }}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 "
        >
          <ArrowLeft strokeWidth={3} size={48} className="text-primary" />
        </div>
      </div>

      {/* Other sections below */}
      <div ref={page1Ref}>
        <Page1 />
      </div>
      <Page2 />
      <Page3 />
      {/*<Page4 />*/}
    </div>
  );
};