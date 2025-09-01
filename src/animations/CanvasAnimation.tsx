import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

export function CanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Preload sequence
    const frameCount = 300;
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const padded = i.toString().padStart(4, "0");
      const img = new Image();
      img.src = `/male${padded}.png`;
      images.push(img);
    }

    const sequence = { frame: 1 };
    const render = () => {
      const img = images[sequence.frame];
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const x = (canvas.width - img.width * ratio) / 2;
        const y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
      }
    };

    images[1].onload = render;

    gsap.to(sequence, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "400% top" : "600% top",
        scrub: isMobile ? 0.1 : 0.15,
        onUpdate: render,
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: "top top",
      end: isMobile ? "400% top" : "600% top",
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative h-screen w-screen bg-background z-10">
      <canvas ref={canvasRef} className="relative max-w-full max-h-full" />
    </div>
  );
}