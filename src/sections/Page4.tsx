import React, { useRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink, Calendar, MapPin, Users, Award, Code, Palette, Zap, Database, Cloud, Shield } from 'lucide-react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animated Background
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    animate();
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// Skills Grid Component
const SkillsGrid = () => {
  const skills = [
    { icon: <Code className="w-8 h-8" />, title: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS"] },
    { icon: <Database className="w-8 h-8" />, title: "Backend", items: ["Node.js", "Python", "GraphQL", "REST APIs"] },
    { icon: <Cloud className="w-8 h-8" />, title: "DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
    { icon: <Shield className="w-8 h-8" />, title: "Security", items: ["Encryption", "RBAC", "Cybersecurity", "Testing"] },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <FloatingElement key={skill.title} delay={index * 200}>
          <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-blue-400/30">
            <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{skill.title}</h3>
            <div className="space-y-2">
              {skill.items.map((item, idx) => (
                <div
                  key={item}
                  className="text-gray-300 text-sm opacity-80 hover:opacity-100 transition-opacity"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FloatingElement>
      ))}
    </div>
  );
};

// Timeline Component
const Timeline = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Rosa Tech",
      period: "Feb 2024 - Jun 2025",
      location: "Jamshedpur, India",
      achievements: [
        "90% reduction in RTPS latency optimization",
        "Built API Gateway handling 1M+ requests/month",
        "20% improvement in cloud monitoring",
        "Migrated 18+ monolithic applications to microservices"
      ]
    },
    {
      title: "Full Stack Developer", 
      company: "Airender",
      period: "Jun 2023 - Jan 2024",
      location: "Bengaluru, India",
      achievements: [
        "33% reduction in page load times",
        "55% improvement in data consistency",
        "41% reduction in manual intervention through automation",
        "38% decrease in code conflicts"
      ]
    }
  ];
  
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-600"></div>
      {experiences.map((exp, index) => (
        <FloatingElement key={index} delay={index * 300}>
          <div className="relative pl-20 pb-12">
            <div className="absolute left-6 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900"></div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <span className="text-blue-400 font-medium">{exp.period}</span>
              </div>
              <div className="flex items-center gap-4 mb-4 text-gray-300">
                <span className="font-medium">{exp.company}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{exp.location}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FloatingElement>
      ))}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <FloatingElement delay={index * 200}>
      <div 
        className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-blue-400/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <div className="flex gap-2">
              {project.github && (
                <a href={project.github} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="text-gray-400 hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, idx) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-xs font-medium"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="space-y-2">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="text-gray-300 text-xs flex items-start gap-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FloatingElement>
  );
};

// Main Portfolio Component
export function Page4() {
  const isMobile = useIsMobile();
  const [currentSection, setCurrentSection] = useState(0);
  
  const projects = [
    {
      name: "MedKnight",
      description: "AI-Powered Teleradiology SaaS Platform enabling hospitals to upload imaging studies for remote reporting with advanced DICOM handling.",
      demo: "https://medknight.in",
      tech: ["Next.js", "TypeScript", "Prisma", "AWS", "Python", "FastAPI"],
      highlights: [
        "Enterprise SaaS solution for healthcare",
        "AI-driven case triage and automation", 
        "Real-time analytics dashboard",
        "Advanced PACS integration"
      ]
    },
    {
      name: "Grill AI",
      description: "Intelligent Interview Platform with AI-powered simulation, real-time assessment, and smart job matching algorithms.",
      github: "https://github.com/grillai",
      tech: ["Next.js", "TypeScript", "Shadcn", "Clerk", "Docker", "Kubernetes"],
      highlights: [
        "GenAI question generation",
        "Automated candidate evaluation",
        "Smart job-specific matching",
        "Performance analytics system"
      ]
    }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollY / windowHeight);
      setCurrentSection(section);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <FloatingElement>
            <h1 className={`font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent ${
              isMobile ? "text-4xl sm:text-5xl" : "text-7xl"
            }`}>
              Hi! I'm Asit K.
            </h1>
          </FloatingElement>
          
          <FloatingElement delay={300}>
            <h2 className={`font-light text-blue-400 mb-6 ${
              isMobile ? "text-xl sm:text-2xl" : "text-3xl"
            }`}>
              Full Stack Software Engineer
            </h2>
          </FloatingElement>
          
          <FloatingElement delay={600}>
            <p className={`text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed ${
              isMobile ? "text-base px-4" : "text-lg"
            }`}>
              2+ years of expertise in designing, developing & scaling production-grade applications. 
              Passionate about building innovative solutions that drive business growth.
            </p>
          </FloatingElement>
          
          <FloatingElement delay={900}>
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </FloatingElement>
          
          <FloatingElement delay={1200}>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <Download className="w-4 h-4 mr-2 inline" />
              Download Resume
            </button>
          </FloatingElement>
        </div>
        
        {/* Floating Skills */}
        {!isMobile && (
          <>
            <FloatingElement delay={1500} className="absolute top-[20%] left-[10%]">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                <span className="text-sm text-blue-400">React • TypeScript</span>
              </div>
            </FloatingElement>
            <FloatingElement delay={1700} className="absolute top-[70%] right-[15%]">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2">
                <span className="text-sm text-blue-400">Node.js • Python</span>
              </div>
            </FloatingElement>
          </>
        )}
      </section>
      
      {/* About Section */}
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid ${isMobile ? 'grid-cols-1 text-center' : 'grid-cols-2 gap-12'} items-center`}>
            <div>
              <FloatingElement>
                <h3 className="text-blue-400 font-medium mb-4">About Me</h3>
                <h2 className={`font-bold mb-6 leading-tight ${
                  isMobile ? "text-4xl" : "text-5xl"
                }`}>
                  Innovation
                  <br />
                  Meets Design
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Software Engineer with 2+ years of expertise in designing, developing & scaling production-grade applications. 
                  Expert in full-stack development, microservices architecture, cloud infrastructure optimization & AI-powered solutions.
                </p>
                <div className="flex gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2+</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">18+</div>
                    <div className="text-sm text-gray-400">Apps Migrated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">1M+</div>
                    <div className="text-sm text-gray-400">Requests Handled</div>
                  </div>
                </div>
              </FloatingElement>
            </div>
            
            {!isMobile && (
              <div>
                <FloatingElement delay={300}>
                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full flex items-center justify-center">
                      <img
                        src="/assets/asit.png"
                        alt="Asit K"
                        className="w-64 h-64 rounded-full object-cover border-4 border-blue-400/30"
                      />
                    </div>
                  </div>
                </FloatingElement>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="min-h-screen py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <FloatingElement>
            <div className="text-center mb-16">
              <h3 className="text-blue-400 font-medium mb-4">Technical Expertise</h3>
              <h2 className={`font-bold mb-6 ${isMobile ? "text-4xl" : "text-5xl"}`}>
                Skills & Technologies
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Comprehensive expertise across the full development stack with focus on modern technologies and best practices.
              </p>
            </div>
          </FloatingElement>
          
          <SkillsGrid />
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <FloatingElement>
            <div className="text-center mb-16">
              <h3 className="text-blue-400 font-medium mb-4">Professional Journey</h3>
              <h2 className={`font-bold mb-6 ${isMobile ? "text-4xl" : "text-5xl"}`}>
                Work Experience
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Led cross-functional teams and delivered high-impact solutions across different industries.
              </p>
            </div>
          </FloatingElement>
          
          <Timeline />
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="min-h-screen py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <FloatingElement>
            <div className="text-center mb-16">
              <h3 className="text-blue-400 font-medium mb-4">Featured Work</h3>
              <h2 className={`font-bold mb-6 ${isMobile ? "text-4xl" : "text-5xl"}`}>
                Projects
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Innovative solutions built with cutting-edge technologies and modern development practices.
              </p>
            </div>
          </FloatingElement>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <FloatingElement>
            <h3 className="text-blue-400 font-medium mb-4">Get In Touch</h3>
            <h2 className={`font-bold mb-8 ${isMobile ? "text-4xl" : "text-6xl"}`}>
              Let's Work
              <br />
              Together
            </h2>
          </FloatingElement>
          
          <FloatingElement delay={300}>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Ready to bring your next project to life? Let's discuss how we can create something amazing together.
            </p>
          </FloatingElement>
          
          <FloatingElement delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="mailto:your@email.com"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-4 h-4 mr-2 inline" />
                Send Email
              </a>
              <a
                href="#"
                className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-4 h-4 mr-2 inline" />
                Schedule Call
              </a>
            </div>
          </FloatingElement>
          
          <FloatingElement delay={900}>
            <div className="flex justify-center mb-8">
              <img
                src="/assets/asit.png"
                alt="Asit K"
                className="w-32 h-32 rounded-full border-4 border-blue-400/30 hover:border-blue-400/60 transition-all duration-300"
              />
            </div>
          </FloatingElement>
          
          <FloatingElement delay={1200}>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </FloatingElement>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Asit K. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Built with React & TailwindCSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};