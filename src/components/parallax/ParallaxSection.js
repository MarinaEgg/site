import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  offset = 50, 
  speed = 0.5, 
  className = '',
  style = {},
  ...props 
}) => {
  const { scrollY } = useViewportScroll();
  
  // Transforme pour l'effet parallax
  const y = useTransform(scrollY, [0, 1000], [0, offset * speed]);
  
  return (
    <motion.div
      style={{
        y,
        ...style
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;

