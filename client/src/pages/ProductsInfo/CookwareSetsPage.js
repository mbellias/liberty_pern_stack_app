import ScrollFadeIn from '../../components/UI/ScrollFadeIn';
import styles from './CookwareSetsPage.module.css';

const CookwareSetsPage = () => {
  return (
    <>
      <main>
        <ScrollFadeIn>
          <h1>Juegos de Utensilios de Cocina</h1>
          <br />
          <div className={styles['cookware-set']}>
            <img
              src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/information/13-pcs-cookware-set_mdiq3f.jpg"
              alt="13-pcs"
            />
            <div className={styles['cookware-list']}>
              <h4 className={styles['cookware-title']}>13-pcs</h4>
              <ul>
                <li>4 Qt La Olla de Vapor</li>
                <li>4 Qt La Olla con Tapa</li>
                <li>6 Qt La Olla con Tapa</li>
                <li>8 Qt La Olla con Tapa</li>
                <li>12" Sartén con Tapa</li>
                <li>9" Sartén con Tapa</li>
              </ul>
            </div>
          </div>
        </ScrollFadeIn>
        <br />
        <ScrollFadeIn>
          <div className={styles['cookware-set']}>
            <img
              src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/information/17-pcs-cookware-set_r8jopw.jpg"
              alt="17-pcs"
            />
            <div className={styles['cookware-list']}>
              <h4 className={styles['cookware-title']}>17-pcs</h4>
              <ul>
                <li>Acero Inoxidable 18/10 con Acabado de Espejo</li>
                <li>Aluminio 3045</li>
                <li>Acero Inoxidable T304</li>
                <li>Aluminum Alloy 1145</li>
                <li>Junta de plata</li>
                <li>Aluminio 1145</li>
                <li>Magnética Acero Inoxidable</li>
              </ul>
            </div>
          </div>
        </ScrollFadeIn>
        <br />
        <ScrollFadeIn>
          <div className={styles['cookware-set']}>
            <img
              src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/information/22-pcs-cookware-set_wnik2s.jpg"
              alt="22-pcs"
            />
            <div className={styles['cookware-list']}>
              <h4 className={styles['cookware-title']}>22-pcs</h4>
              <ul>
                <li>2 Qt La Olla con Tapa</li>
                <li>3 Qt La Olla con Tapa</li>
                <li>5.5 Qt La Olla con Tapa</li>
                <li>8 Qt La Olla con Tapa</li>
                <li>9.5" Sartén con Tapa</li>
                <li>12" Sartén con Tapa</li>
                <li>5.5 Qt Colador encaja 20 & 24 cm La Olla</li>
                <li>2 Qt Doble El Hervidor encaja 20 cm La Olla</li>
                <li>3.5 Qt Doble El Hervidor encaja 24 cm La Olla</li>
                <li>El Cuenco Pequeño</li>
                <li>El Cuenco Grande</li>
                <li>Rallador</li>
                <li>Anillo Rallador</li>
                <li>Elevador de Rallador</li>
                <li>Prensa de Patatas</li>
                <li>Elevador de Tapa de Plástico</li>
              </ul>
            </div>
          </div>
        </ScrollFadeIn>
      </main>
    </>
  );
};

export default CookwareSetsPage;
