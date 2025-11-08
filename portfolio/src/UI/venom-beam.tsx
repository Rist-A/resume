import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

const VenomBeam: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isDarkRef.current = document.documentElement.classList.contains("dark");

      ctx.fillStyle = isDarkRef.current ? "#000000" : "#f8f8ff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initParticles();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 0,
        maxLife: Math.random() * 100 + 50,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      }));
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDarkRef.current
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(248, 248, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;

        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 2;
          particle.vy = (Math.random() - 0.5) * 2;
          particle.life = 0;
          particle.maxLife = Math.random() * 100 + 50;
        }

        const alpha = particle.opacity * (1 - particle.life / particle.maxLife);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );

        if (isDarkRef.current) {
          gradient.addColorStop(0, `rgba(200, 200, 255, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(150, 150, 200, ${alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(100, 100, 150, ${alpha * 0.3})`);
        } else {
          gradient.addColorStop(0, `rgba(60, 60, 120, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(80, 80, 140, ${alpha * 0.8})`);
          gradient.addColorStop(1, `rgba(100, 100, 160, ${alpha * 0.3})`);
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Connect nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const alpha = ((100 - distance) / 100) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkRef.current
              ? `rgba(150, 150, 200, ${alpha})`
              : `rgba(80, 80, 140, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-600 rounded-full opacity-50 blur-sm" />
      <div className="absolute bottom-32 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-40 blur-sm" />
    </div>
  );
};

export default VenomBeam;
