import './Header.scss';
import HeaderNav from './HeaderNav/HeaderNav';
import { useHoverEffect } from '../../hooks/useHoverEffect';

export default () => {
  const { bgPos, isInverted, onMouseEnter, onMouseLeave } = useHoverEffect();

  const wordList = ['Solutions', 'Technology', 'About', 'Careers', 'Resources', 'Contact'];

  return (
    <div className='Header'>
      <div className='container Header_container'>
        <div
          className="Header_logo hoverWhite"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ backgroundPosition: `${bgPos}% 0%` }}
        >
          <img
            src="./Logo.svg"
            alt=""
            className='Header_logo_img'
            style={ isInverted ? { filter: 'invert(1)' } : { filter: 'none' } }
          />
        </div>

        <div className='Header_nav'>
          <HeaderNav wordList={wordList} hoverEffect={useHoverEffect} />
        </div>
      </div>
    </div>
  );
};
