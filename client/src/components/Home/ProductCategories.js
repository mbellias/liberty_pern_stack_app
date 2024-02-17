import { Link } from 'react-router-dom';
import styles from './ProductCategories.module.css';

const ProductCategories = () => {
  return (
    <section className={styles['product-categories']}>
      <Link to="/product-info/waterfilters">
        <img
          src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039880/liberty-nutrition-system/home-images/water-filter-icon_es_mbzu6p.png"
          alt="water filter icon"
        />
      </Link>
      <Link to="/product-info/cookwaresets">
        <img
          src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/home-images/cookware-sets-icon_es_p42abv.png"
          alt="cookware sets icon"
        />
      </Link>
      <Link to="/product-info/accessories">
        <img
          src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/home-images/accessories-icon_es_vkocvi.png"
          alt="accessories icon"
        />
      </Link>
    </section>
  );
};

export default ProductCategories;
