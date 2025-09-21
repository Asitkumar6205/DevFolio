import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Navbar } from "@/layouts/Navbar";
import { CanvasAnimation } from "@/animations/CanvasAnimation";
import { Page1 } from "@/sections/Page1";
import { Page2 } from "@/sections/Page2";
import { Page3 } from "@/sections/Page3";
import { HeroSection } from "../sections/HeroSection";
import { Page4 } from "../sections/Page4";

// Skills Solar System Component
export default function SkillsSolarSystem () {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const skills = [
    'ReactJs', 'Python', 'NodeJs', 'TypeScript', 'MongoDB', 'MySQL', 
    'NextJS', 'Zustand', 'TailwindCSS', 'GSAP', 'Framer Motion', 'REST',
    'GraphQL', 'Redis', 'Postgres', 'AWS', 'Docker', 'K8s', 'LLMs', 
    'RAG', 'Pinecone', 'RabbitMQ', 'Socket.io', 'WebRTC', 'Git'
  ];

  const primaryColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1',
    '#14B8A6', '#F43F5E', '#A855F7', '#22C55E', '#3B82F6'
  ];

  useEffect(() => {
    const container = containerRef.current;
    const center = centerRef.current;

    if (!container || !center) return;

    // Create skill bubbles
    const skillElements = skills.map((skill, index) => {
      const bubble = document.createElement('div');
      bubble.className = 'skill-bubble';
      bubble.textContent = skill;
      
      // Calculate orbit radius - create multiple orbital layers
      const orbitLayer = Math.floor(index / 8) + 1;
      const radius = 100 + (orbitLayer * 80);
      
      // Distribute skills evenly in their orbit layer
      const skillsInLayer = Math.min(8, skills.length - (orbitLayer - 1) * 8);
      const angleStep = 360 / skillsInLayer;
      const skillInLayer = index % 8;
      const startAngle = skillInLayer * angleStep;
      
      // Calculate initial position
      const x = Math.cos((startAngle * Math.PI) / 180) * radius;
      const y = Math.sin((startAngle * Math.PI) / 180) * radius;
      
      // Style the bubble
      const colorIndex = index % primaryColors.length;
      bubble.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: ${Math.max(70, skill.length * 7)}px;
        height: 50px;
        background: linear-gradient(135deg, ${primaryColors[colorIndex]}, ${primaryColors[colorIndex]}dd);
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 11px;
        font-weight: 600;
        text-align: center;
        box-shadow: 
          0 8px 32px rgba(0,0,0,0.3),
          inset 0 2px 8px rgba(255,255,255,0.3),
          inset 0 -2px 8px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
      `;
      
      // Add hover effects
      bubble.addEventListener('mouseenter', () => {
        gsap.to(bubble, {
          scale: 1.15,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      bubble.addEventListener('mouseleave', () => {
        gsap.to(bubble, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      container.appendChild(bubble);
      
      // Set initial position
      gsap.set(bubble, {
        x: x,
        y: y,
        rotation: 0
      });
      
      return {
        element: bubble,
        radius: radius,
        startAngle: startAngle,
        speed: 0.8 + (orbitLayer * 0.2), // Outer orbits slower
        direction: orbitLayer % 2 === 0 ? 1 : -1, // Alternating directions by layer
        orbitLayer
      };
    });

    // Animate center element
    gsap.to(center, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

    gsap.to(center, {
      scale: 1.1,
      duration: 3,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });

    // Create orbital animations
    skillElements.forEach((skillObj, index) => {
      const { element, radius, speed, direction } = skillObj;
      
      // Main orbital rotation around center
      const timeline = gsap.timeline({ repeat: -1 });
      
      timeline.to(element, {
        rotation: direction * 360,
        duration: 20 / speed,
        ease: "none",
        motionPath: {
          path: `M${radius},0 A${radius},${radius} 0 1,${direction > 0 ? 1 : 0} -${radius},0 A${radius},${radius} 0 1,${direction > 0 ? 1 : 0} ${radius},0`,
          autoRotate: false
        }
      });
      
      // Additional floating animation for 3D effect
      gsap.to(element, {
        y: `+=${Math.random() * 15 - 7.5}`,
        duration: 4 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.1
      });
      
      // Subtle scale pulsing
      gsap.to(element, {
        scale: 1.02,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3
      });

      // Rotation animation for the skill bubbles themselves
      gsap.to(element, {
        rotationZ: direction * 180,
        duration: 8,
        ease: "none",
        repeat: -1,
        delay: index * 0.2
      });
    });

    // Cleanup function
    return () => {
      skillElements.forEach(({ element }) => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 animate-pulse"></div>
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {/* Center element */}
        <div 
          ref={centerRef}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-2xl relative z-20"
          style={{
            boxShadow: `
              0 0 40px rgba(255, 165, 0, 0.9),
              0 0 80px rgba(255, 165, 0, 0.6),
              0 0 120px rgba(255, 165, 0, 0.3),
              inset 0 2px 8px rgba(255, 255, 255, 0.3)
            `
          }}
        >
          SKILLS
        </div>
      </div>

      {/* Floating title */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center z-30">
        <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Skills Universe</h2>
        <p className="text-gray-300 text-sm">Full-Stack Developer & AI Engineer</p>
      </div>
    </div>
  );
};
