import { useState } from 'react';

export const useHoverEffect = (step = 100) => {
  const [bgPos, setBgPos] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => {
    setBgPos(prev => prev + step);
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setBgPos(prev => prev + step);
    setIsHovering(false);
  };

  const isInverted = (bgPos / step) % 2 === 1;

  return { bgPos, isInverted, isHovering, onMouseEnter, onMouseLeave };
};