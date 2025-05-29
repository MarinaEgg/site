import React, { useRef } from 'react';
import { useInViewport } from '../../hooks/useInViewport'; // Changement ici : utilisation des accolades pour l'import nommé
import './NOGProjectSection.css';

const NOGProjectSection = () => {
  const sectionRef = useRef(null);
  const isVisible = useInViewport(sectionRef, false, { threshold: 0.3 });

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
