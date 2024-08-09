import React, { useEffect } from 'react';
import gsap from 'gsap';

export const IntroPanel: React.FC = () => {

    useEffect(() => {
        gsap.to('.rotate-letter', {
            rotation: 350,
            duration: 0.7,
            stagger: 0.1,
            ease: 'none'
        });
    }, []);

    return (
        <>
            <blockquote id="main-title">
                {Array.from('Inverting').map((letter, index) => (
                    <span key={index} className="rotate-letter">{letter}</span>
                ))} <span className="highlighted">Spatial</span> Interfaces
            </blockquote>
            <h2>GSAPP CDP 2023-4 Colloquium I</h2>
            <h3>Sebastian Schloesser</h3>
        </>
    )
}