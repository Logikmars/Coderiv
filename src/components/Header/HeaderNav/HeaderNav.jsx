import { useHoverEffect } from '../../../hooks/useHoverEffect';
import './HeaderNav.scss';

export default ({ wordList }) => {
  const hoverStates = wordList.map(() => useHoverEffect());

  return (
    <div className='HeaderNav'>
      {wordList.map((word, index) => {
        const { bgPos, isInverted, isHovering, onMouseEnter, onMouseLeave } = hoverStates[index];

        return (
          <div
            key={index}
            className='HeaderNav_el hoverWhite'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
              backgroundPosition: `${bgPos}% 0%`,
              color: isInverted ? '#000' : '#ffffff6c',
            }}
          >
            {word.split('').map((char, i) => (
              <span
                key={i}
                className={`letter ${isHovering ? 'rotate' : ''}`}
                style={{ display: 'inline-block',
                    color: isInverted ? '#000' : '#ffffff6c',
                 }}
              >
                {char}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};