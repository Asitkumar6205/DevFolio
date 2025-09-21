import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TextRevealAnimationProps {
  text: string;
  className?: string;
  visiblePortion?: string;
}

export function TextRevealAnimation({ 
  text, 
  className = "", 
  visiblePortion = "" 
}: TextRevealAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isFullyRevealed = false;
    let hasScrollStarted = false;

    // Split text into individual characters
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
      span.className = 'char';
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.setAttribute('data-index', index.toString());
      return span;
    });

    // Clear container and add character spans
    containerRef.current.innerHTML = '';
    chars.forEach(char => containerRef.current!.appendChild(char));

    // Use direct length calculation - the visible portion should match from the start
    const visibleLength = visiblePortion.length;
    
    // Make only the exact visible portion immediately visible
    chars.forEach((char, index) => {
      if (index < visibleLength) {
        char.style.opacity = '1';
      } else {
        char.style.opacity = '0';
      }
    });

    // Create timeline for scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        end: "bottom 10%",
        scrub: 2, // Slower scrub for more control
        onEnter: () => {
          hasScrollStarted = true;
        },
        onUpdate: (self) => {
          const progress = self.progress;
          
          // If already fully revealed, keep everything visible
          if (isFullyRevealed) {
            chars.forEach(char => {
              char.style.opacity = '1';
            });
            return;
          }

          // Only start revealing after user has scrolled
          if (!hasScrollStarted || progress <= 0.1) {
            // Keep only the visible portion shown
            chars.forEach((char, index) => {
              if (index < visibleLength) {
                char.style.opacity = '1';
              } else {
                char.style.opacity = '0';
              }
            });
            return;
          }

          // Calculate how many additional characters should be visible based on scroll progress
          const startIndex = visibleLength;
          const totalHiddenChars = text.length - startIndex;
          // Start from 10% progress to give a buffer
          const adjustedProgress = Math.max(0, (progress - 0.1) / 0.9);
          const additionalVisibleChars = Math.floor(adjustedProgress * totalHiddenChars);
          
          // Check if animation is complete
          if (progress >= 1) {
            isFullyRevealed = true;
          }
          
          // Show characters progressively
          chars.forEach((char, index) => {
            if (index < startIndex) {
              // Keep visible portion always visible
              char.style.opacity = '1';
            } else if (index < startIndex + additionalVisibleChars || isFullyRevealed) {
              // Reveal additional characters based on scroll progress or if fully revealed
              char.style.opacity = '1';
            } else {
              // Keep remaining characters hidden
              char.style.opacity = '0';
            }
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, visiblePortion]);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
}