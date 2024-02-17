import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MobileNavigation from '../../components/Navigation/MobileNavigation';
import DesktopNavigation from '../../components/Navigation/DesktopNavigation';
import { isMobileScreen } from '../../components/Utility/Utility';
import styles from './Root.module.css';

const RootLayout = () => {
  const [isMobile, setIsMobile] = useState(isMobileScreen());
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    function handleResize() {
      setIsMobile(isMobileScreen());
    }

    function handleScroll() {
      const currentScrollPos = window.scrollY;
      const scrollDifference = currentScrollPos - prevScrollPos;

      if (scrollDifference > 0) {
        if (currentScrollPos > scrollThreshold) {
          document.querySelector(`.${styles.header}`).style.top = `-${
            document.querySelector(`.${styles.header}`).offsetHeight
          }px`;
        }
      } else {
        document.querySelector(`.${styles.header}`).style.top = '0';
      }

      setPrevScrollPos(currentScrollPos);
    }

    const scrollThreshold = 75;

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div className={styles.header}>
        {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
        <img
          src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039880/liberty-nutrition-system/home-images/liberty_logo_cjuke0.png"
          alt="logo"
        />
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
