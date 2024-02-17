import styles from './FooterSection.module.css';

const FooterSection = () => {
  return (
    <section className={styles.footer}>
      <p>
        <i className="material-icons">location_on</i>
        4300 Bergenline Ave, Suite 203, Union City, NJ 07087
        <br />
        &copy; Derechos de autor 2023. Liberty Nutrition System Inc. Reservados
        todos los derechos.
        <br />
        Síganos:
        <br />
        <a href="https://www.facebook.com/LibertyNutritionSystemInc/about/?ref=page_internal">
          <img
            src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/home-images/facebook_icon_j0gxvo.png"
            alt="facebook"
            width="40"
            height="40"
          />
        </a>
      </p>
    </section>
  );
};

export default FooterSection;
