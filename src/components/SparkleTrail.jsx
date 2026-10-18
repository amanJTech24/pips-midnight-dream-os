import { useEffect, useRef } from 'react';

/**
 * SparkleTrail — A cursor sparkle trail effect.
 * Renders small sparkle particles that follow the mouse cursor.
 * Cleaned up on unmount. Only active on non-touch devices.
 */
export default function SparkleTrail() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FFD97A', '#F5A623', '#D4C4E8', '#F4D4D4', '#A34063'];

    const handleMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Add 1-2 sparkle particles on movement
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1.0,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
        });
      }
      // Limit particle count for performance
      if (particles.current.length > 60) {
        particles.current = particles.current.slice(-40);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        p.size *= 0.98;

        if (p.life <= 0 || p.size < 0.3) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouse);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="sparkle-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  );
}
