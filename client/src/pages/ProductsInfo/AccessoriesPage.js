import AccessoriesSlideshow from '../../components/Slideshow/AccessoriesSlideshow';
import ChinaSlideshow from '../../components/Slideshow/ChinaSlideshow';
import CutlerySetSlideshow from '../../components/Slideshow/CutlerySetSlideshow';
import ScrollFadeIn from '../../components/UI/ScrollFadeIn';
import styles from './AccessoriesPage.module.css';

const AccessoriesPage = () => {
  return (
    <>
      <ScrollFadeIn>
        <h1 className={styles.title}>Accessorios</h1>
        <div className={styles['first-slideshow']}>
          <AccessoriesSlideshow />
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <h2 className={styles.title}>Bone China</h2>
        <div className={styles['second-slideshow']}>
          <ChinaSlideshow />
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <h2 className={styles.title}>Cutlery Set</h2>
        <div className={styles['third-slideshow']}>
          <CutlerySetSlideshow />
        </div>
      </ScrollFadeIn>
    </>
  );
};

export default AccessoriesPage;
