import { useRef, useEffect } from 'react';

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);
  const particles = [];
  const mouse = { x: 0, y: 0, radius: 20 };

  function mountain1(x, canvasHeight) {
    // Пример: синус + смещение
    return canvasHeight - (Math.sin(x * 0.01) * 100 + 150);
  }

  function mountain2(x, canvasHeight) {
    return canvasHeight - (Math.cos(x * 0.015) * 80 + 200);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    const particleCount = 2000;
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      
      // Выбираем, к какой горе будет прилипать частица
      const y = Math.random() < 0.5 ? mountain1(x, canvas.height) : mountain2(x, canvas.height);

      particles.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        size: 2,
        density: Math.random() * 40 + 1,
      });
    }

    function handleMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse repulsion
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          p.x -= Math.cos(angle) * force * p.density;
          p.y -= Math.sin(angle) * force * p.density;
        } else {
          // Move back to original place
          p.x += (p.baseX - p.x) * 0.01;
          p.y += (p.baseY - p.y) * 0.01;
        }

        // Draw particle
        ctx.fillStyle = '#e1b5ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: '#1c1c1c',
      }}
    />
  );
}
