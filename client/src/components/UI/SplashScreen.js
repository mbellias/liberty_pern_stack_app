import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  const containerControls = useAnimation();
  const imageControls = useAnimation();

  useEffect(() => {
    const animateIn = async () => {
      await containerControls.start({ opacity: 1 });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await imageControls.start({ opacity: 1 });

      setTimeout(() => {
        containerControls.start({ opacity: 0, x: '-100%' });
        imageControls.start({ opacity: 0 });
      }, 1500);
    };

    animateIn();
  }, [containerControls, imageControls]);

  return (
    <motion.div
      className={styles['splash-screen']}
      initial={{ opacity: 0 }}
      animate={containerControls}
    >
      <motion.img
        src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039880/liberty-nutrition-system/home-images/liberty_logo_cjuke0.png"
        alt="logo"
        style={{ opacity: 0 }}
        animate={imageControls}
      />
    </motion.div>
  );
};

export default SplashScreen;
