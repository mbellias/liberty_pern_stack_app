import { useState } from 'react';
import styles from './WaterFilterSlideshow.module.css';

const SlideshowTwo = () => {
  const slides = [
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701642526/liberty-nutrition-system/home-slideshow/9X16-DOUBLEGATEFOLD_outside_itkao7.jpg',
    'https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701642519/liberty-nutrition-system/home-slideshow/9X16-DOUBLEGATEFOLD_inside_p8wfhe.jpg',
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

export default SlideshowTwo;
