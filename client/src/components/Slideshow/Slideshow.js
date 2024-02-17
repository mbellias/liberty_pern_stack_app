import React, { useEffect, useState } from 'react';
import styles from './Slideshow.module.css';

const Slideshow = () => {
  const slides = [
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039878/liberty-nutrition-system/home-slideshow/index-slider-1_wnid96.png',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039879/liberty-nutrition-system/home-slideshow/index-slider-2_dd1gbl.png',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039879/liberty-nutrition-system/home-slideshow/index-slider-3_apza0f.png',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039879/liberty-nutrition-system/home-slideshow/index-slider-4_q8t8na.png',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039879/liberty-nutrition-system/home-slideshow/index-slider-5_troy5s.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  });

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

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentSlide ? styles.active : ''
            }`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
