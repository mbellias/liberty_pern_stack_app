import React, { useEffect, useState, useCallback } from 'react';
import styles from './WaterFilterSlideshow.module.css';

const WaterFilterSlideshow = () => {
  const slides = [
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-1_s8gsym.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039874/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-2_cgyt45.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039874/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-3_fsrzn7.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039874/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-4_onnhjs.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039874/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-5_uxbhme.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039874/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-6_gelfja.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039875/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-7_qjpgje.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039875/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-8_mcusen.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039875/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-9_t2eice.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039875/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-10_mjqj6z.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039875/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-11_auqtuf.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039876/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-13_mr0wfy.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039876/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-13_mr0wfy.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039876/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-14_sqeda2.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039876/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-15_q14i2f.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039876/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-16_bqeozz.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039877/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-17_x1nubj.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039877/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-18_ycrytg.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039877/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-19_bysuqm.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039877/liberty-nutrition-system/water-filter-slideshow/filtro-magazine-20_h6muff.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  }, [slides.length]);

  const togglePause = useCallback(() => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }, []);

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(goToNextSlide, 10000);
    }

    return () => clearInterval(interval);
  }, [isPaused, goToNextSlide]);

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
      <button
        className={styles.pauseButton}
        onClick={togglePause}
      >
        {isPaused ? (
          <i className="material-icons">play_arrow</i>
        ) : (
          <i className="material-icons">pause</i>
        )}
      </button>
    </div>
  );
};

export default WaterFilterSlideshow;
