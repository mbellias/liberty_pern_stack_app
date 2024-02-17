import { useState } from 'react';
import styles from './CutlerySetSlideshow.module.css';

const CutlerySetSlideshow = () => {
  const slides = [
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701712310/liberty-nutrition-system/information/product-slider-4_hkp4mn.png',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701712303/liberty-nutrition-system/information/product-slider-3_tshwub.png',
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

export default CutlerySetSlideshow;
