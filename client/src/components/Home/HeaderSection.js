import styles from './HeaderSection.module.css';

const HeaderSection = () => {
  return (
    <section className={styles['home-header']}>
      <img
        src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039878/liberty-nutrition-system/home-images/header_ptglom.png"
        alt="header"
      />
    </section>
  );
};

export default HeaderSection;
