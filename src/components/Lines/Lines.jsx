import { useState, useEffect } from 'react';
import './Lines.scss';

export default () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    setMouse({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='Lines'>
      {Array(20)
        .fill(0)
        .map((_, index) => {
          const offsetY = mouse.y * (index + 1) * 5;
          return (
            <div
              className='Lines_line'
              key={`Lines_${index}`}
              style={{
                opacity: 0.01 * index,
                transform: `translate(0px, ${offsetY}px)`,
              }}
            ></div>
          )
        })}
    </div>
  )
}
