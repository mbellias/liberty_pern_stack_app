import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollFadeIn = ({ children, threshold = 0.15 }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;
