import React, { useRef, useEffect } from "react";
import './ParticlesCanvas.scss'

const IMAGE_SRC = "./dots.svg";

export default function ParticlesCanvas({
  width = window.innerWidth,
  height = window.innerHeight,
  pixelStep = Number(import.meta.env.VITE_PIXEL_STEP ?? 3),
  pointSize = Number(import.meta.env.VITE_POINT_SIZE ?? 2),
  mouseRadius = Number(import.meta.env.VITE_MOUSE_RADIUS ?? 80),
}) {
  const canvasRef = useRef(null);
  const offRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, down: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const off = document.createElement("canvas");
    offRef.current = off;
    const offCtx = off.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = IMAGE_SRC;

    img.onload = () => {
      const scale = height / img.height;
      const drawW = Math.round(img.width * scale);
      const drawH = Math.round(img.height * scale);

      off.width = width;
      off.height = height;
      offCtx.clearRect(0, 0, off.width, off.height);
      offCtx.drawImage(img, 0, 0, drawW, drawH);

      const particles = [];
      const imgData = offCtx.getImageData(0, 0, off.width, off.height).data;

      const xOffset = (canvas.width - off.width) / 2;
      const yOffset = (canvas.height - off.height) / 2;

      for (let y = 0; y < off.height; y += pixelStep) {
        for (let x = 0; x < off.width; x += pixelStep) {
          const idx = (y * off.width + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          if (a < 30) continue;

          const cx = x + xOffset;
          const cy = y + yOffset;

          particles.push({
            x: cx,
            y: cy,
            baseX: cx,
            baseY: cy,
            vx: 0,
            vy: 0,
            size: pointSize * (0.7 + Math.random() * 0.8),
            color: `rgba(${r},${g},${b},${a / 255})`,
            phase: Math.random() * Math.PI * 2,
            freq: 0.002 + Math.random() * 0.004,
            amp: 1 + Math.random() * 2,
          });
        }
      }

      particlesRef.current = particles;
    };

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    let raf = null;
    let last = performance.now();

    function animate(t) {
      const dt = t - last;
      last = t;
      const particles = particlesRef.current;
      if (!particles || particles.length === 0) {
        raf = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = t;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const noiseY =
          Math.sin(time * p.freq + p.phase) * p.amp * 2 +
          Math.sin(p.baseX * 0.005 + time * 0.0008) * 2;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx > -1000) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) ** 2;
            const dirX = dx / (dist || 1);
            const dirY = dy / (dist || 1);

            p.vx += dirX * force * 0.6;
            p.vy += dirY * force * 0.9;
          }
        }

        const spring = 0.03;
        p.vx += (p.baseX - p.x) * spring * 0.01;
        p.vy += (p.baseY + noiseY - p.y) * spring;

        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [width, height, pixelStep, pointSize, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="ParticlesCanvas"
      style={{
        height: `${height}px`,
        width: `${width}px`
      }}
    />
  );
}