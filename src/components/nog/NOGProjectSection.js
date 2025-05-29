import React, { useRef, useEffect, useState } from 'react';
import './NOGProjectSection.css';

const NOGProjectSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Déclenche quand 30% de la section est visible
        rootMargin: '-50px 0px', // Ajuste le moment du déclenchement
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`nog-project-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="nog-content">
        <div className="nog-background-text">
          N.O.G
        </div>
        <div className="nog-main-content">
          <h1 className="nog-title">
            <span className="highlight">N.O.G PROJECT</span>
          </h1>
          <p className="nog-description">
            A unique collection of legal prompts and agents, built for real-world legal practice. 
            Inspired by orchestration principles, the N.O.G Project offers a specialized framework 
            to build, test, and govern legal agents and intelligent chains.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NOGProjectSection;
