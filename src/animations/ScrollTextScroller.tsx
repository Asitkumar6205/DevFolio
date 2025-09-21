import React, { useEffect, useRef, useState, CSSProperties } from "react";

export default function AutoScrollTextScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = [
    "C++",
    "Python",
    "JavaScript",
    "TypeScript",
    "ReactJS",
    "NextJS",
    "Redux",
    "Zustand",
    "TailwindCSS",
    "GSAP",
    "Framer Motion",
    "NodeJS",
    "ExpressJS",
    "RESTful APIs",
    "GraphQL",
    "Unit Testing",
    "Intg. Testing",
    "TDD",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Encryption",
    "RBAC",
    "Cybersecurity",
    "Profiling",
    "Caching",
    "Db Optimiz.",
    "Git",
    "WebRTC",
    "Socket.io",
    "RabbitMQ",
    "Nginx",
    "Bash",
    "Linux",
    "Scrum",
    "Tech Documen.",
  ];

  const itemHeight = 100; // Height between items
  const totalItems = words.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 1000); // Auto-advance every 1 second

    return () => clearInterval(interval);
  }, [totalItems]);

  const getItemProps = (index: number) => {
    // Calculate the distance from current center item
    let distance = index - currentIndex;

    // Handle circular wrapping
    if (distance > totalItems / 2) {
      distance -= totalItems;
    } else if (distance < -totalItems / 2) {
      distance += totalItems;
    }

    const absDistance = Math.abs(distance);
    const isFocused = absDistance === 0;

    // Only show items within 3 positions of center
    const isVisible = absDistance <= 3;

    let opacity = 0;
    let scale = 0.7;
    let blur = 4;
    let fontSize = "1.5rem";
    let fontWeight = "300";
    let textColorClass = "text-primary/20";

    if (isFocused) {
      opacity = 1;
      scale = 1.3;
      blur = 0;
      fontSize = "3rem";
      fontWeight = "700";
      textColorClass = "text-primary";
    } else if (absDistance === 1) {
      opacity = 0.7;
      scale = 1;
      blur = 0.5;
      fontSize = "2rem";
      fontWeight = "400";
      textColorClass = "text-primary/70";
    } else if (absDistance === 2) {
      opacity = 0.4;
      scale = 0.8;
      blur = 1.5;
      fontSize = "1.7rem";
      fontWeight = "300";
      textColorClass = "text-primary/40";
    } else if (absDistance === 3) {
      opacity = 0.2;
      scale = 0.7;
      blur = 3;
      fontSize = "1.5rem";
      fontWeight = "300";
      textColorClass = "text-primary/20";
    }

    const style: CSSProperties = {
      position: "absolute",
      top: "50%",
      right: "0",
      transform: `translateY(-50%) translateY(${
        distance * itemHeight
      }px) scale(${scale})`,
      transformOrigin: "right center",
      opacity: isVisible ? opacity : 0,
      filter: `blur(${blur}px)`,
      fontSize,
      fontWeight,
      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      whiteSpace: "nowrap" as const,
      zIndex: isFocused ? 10 : Math.max(1, 5 - absDistance),
      width: "max-content", // Ensure width fits content
      minWidth: "fit-content", // Minimum width to fit content
      textAlign: "right" as const,
    };

    return { style, isVisible, textColorClass };
  };

  return (
    <div className="min-h-screen flex items-center justify-end overflow-hidden pr-8">
      <div
        ref={containerRef}
        className="relative h-screen flex items-center justify-end"
        style={{ minWidth: "400px", width: "max-content" }} // Ensure container is wide enough
      >
        {/* Render all words */}
        {words.map((word, index) => {
          const { style, isVisible, textColorClass } = getItemProps(index);

          if (!isVisible) return null;

          return (
            <div
              key={`${word}-${index}`}
              style={style}
              className={`font-mono tracking-wider absolute ${textColorClass}`}
            >
              {word}
            </div>
          );
        })}

        {/* Center reference line */}
        <div
          className="absolute right-8 h-px bg-white/10"
          style={{ 
            top: "50%", 
            transform: "translateY(-0.5px)",
            width: "200px"
          }}
        />
      </div>
    </div>
  );
}