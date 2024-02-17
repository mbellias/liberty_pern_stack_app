import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartButton from '../Cart/CartButton';
import styles from './DesktopNavigation.module.css';

const DesktopNavigation = () => {
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const toggleProducts = () => {
    setIsProductsHovered(!isProductsHovered);
  };

  const submenuStyles = `${styles.products} ${
    isProductsHovered ? styles.active : ''
  }`;

  let loginLink = '/login';

  if (isAuthenticated) {
    if (user.role === 'admin') {
      loginLink = '/admin-profile';
    } else if (user.role === 'distributor') {
      loginLink = '/distributor-profile';
    } else {
      loginLink = '/user-profile';
    }
  }

  return (
    <div className={styles.navDesktop}>
      <nav className={styles.nav}>
        <Link
          to={loginLink}
          className={styles['nav-link']}
        >
          Mi Cuenta
        </Link>
        <Link
          to="/"
          className={styles['nav-link']}
        >
          Inicio
        </Link>
        <div
          className={submenuStyles}
          onMouseEnter={toggleProducts}
          onMouseLeave={toggleProducts}
        >
          <button className={`${styles['nav-link']} ${styles.productsButton}`}>
            Información
          </button>
          <div className={`${styles['products-submenu']}`}>
            <Link
              to="/product-info/waterfilters"
              className={styles['nav-link']}
            >
              Filtros de Agua
            </Link>
            <Link
              to="/product-info/cookwaresets"
              className={styles['nav-link']}
            >
              Juegos de Utensilios de Cocina
            </Link>
            <Link
              to="/product-info/accessories"
              className={styles['nav-link']}
            >
              Accesorios
            </Link>
          </div>
        </div>
        <Link
          to="/shop"
          className={styles['nav-link']}
        >
          Comercio
        </Link>
        <Link
          to="/contact"
          className={styles['nav-link']}
        >
          Contacto
        </Link>
        <CartButton />
      </nav>
    </div>
  );
};

export default DesktopNavigation;
