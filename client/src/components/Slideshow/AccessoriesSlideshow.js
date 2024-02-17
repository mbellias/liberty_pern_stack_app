import { useState } from 'react';
import styles from './AccessoriesSlideshow.module.css';

const AccessoriesSlideshow = () => {
  const slides = [
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701712085/liberty-nutrition-system/information/14in-griddle-8_5x11-back_fxl0vx.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701712093/liberty-nutrition-system/information/22lbs-Pavera-8_5x11-back_blylrn.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className={styles['slideshow-container']}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentSlide ? styles.active : ''
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}

      <button
        className={styles.prevButton}
        onClick={goToPrevSlide}
      >
        &#8249;
      </button>
      <button
        className={styles.nextButton}
        onClick={goToNextSlide}
      >
        &#8250;
      </button>
    </div>
  );
};

export default AccessoriesSlideshow;
