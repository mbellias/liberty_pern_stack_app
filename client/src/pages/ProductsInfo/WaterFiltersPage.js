import WaterFilterSlideshow from '../../components/Slideshow/WaterFilterSlideshow';
import ScrollFadeIn from '../../components/UI/ScrollFadeIn';
import styles from './WaterFiltersPage.module.css';

const WaterFiltersPage = () => {
  return (
    <>
      <main>
        <ScrollFadeIn>
          <h1>Filtros de Agua</h1>
          <div className={styles.slideshow}>
            <WaterFilterSlideshow />
          </div>
        </ScrollFadeIn>
        <section>
          <ScrollFadeIn>
            <h3>Filtro de Agua S/S</h3>
            <img
              className={styles.filter}
              src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701038605/liberty-nutrition-system/information/Screenshot_2023-11-26_at_5.43.03_PM_lr2roj.png"
              alt="Filtros S/S"
            />
          </ScrollFadeIn>
          <ScrollFadeIn>
            <h3>Filtro de Agua C/T 2000</h3>
            <img
              className={styles.filter}
              src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039001/liberty-nutrition-system/information/Screenshot_2023-11-26_at_5.49.36_PM_xxxi3y.png"
              alt="Filtros C/T"
            />
          </ScrollFadeIn>
        </section>
      </main>
    </>
  );
};

export default WaterFiltersPage;
