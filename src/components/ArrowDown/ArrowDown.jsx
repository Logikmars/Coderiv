import './ArrowDown.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default () => {

    const arrowRef = useRef(null);

    useEffect(() => {
        gsap.from(arrowRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: arrowRef.current,
            start: 'top 95%',
            toggleActions: 'play reverse play reverse',
        }
        });
    }, []);

    return (
        <div className='ArrowDown' ref={arrowRef}>
            <img src="./arrowDown.svg" alt="" />
        </div>
    )
}