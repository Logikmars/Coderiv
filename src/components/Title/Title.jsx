import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Title.scss';

gsap.registerPlugin(ScrollTrigger);

export default ({ text }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 95%',
        toggleActions: 'play reverse play reverse',
      }
    });
  }, []);

  return (
    <div className='Title' ref={titleRef}>
      {text}
    </div>
  );
};
