import { useState, useEffect } from 'react';
import styles from './Banner.module.css';

const Banner = ({ onOpenInquiry }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.scrollY;
      const scrollDifference = currentScrollPos - prevScrollPos;

      if (scrollDifference > 0) {
        if (currentScrollPos > scrollThreshold) {
          document.querySelector(`.${styles.banner}`).style.top = `-${
            document.querySelector(`.${styles.banner}`).offsetHeight
          }px`;
        }
      } else {
        document.querySelector(`.${styles.banner}`).style.top = '0';
      }

      setPrevScrollPos(currentScrollPos);
    }

    const scrollThreshold = 75;

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={styles.banner}>
      <h4 className={styles.exclamation}>¡</h4>
      <button
        className={styles.bannerButton}
        onClick={onOpenInquiry}
      >
        Clic Aquí
      </button>
      <h4>
        y un representante de ventas se comunicará con usted y lo ayudará!
      </h4>
    </div>
  );
};

export default Banner;
