import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetCart } from '../../store/cart-actions';
import styles from './MobileNavigation.module.css';

const MobileNavigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsProductsOpen(false);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

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

  const overlayStyles = `${styles.overlay} ${isNavOpen ? styles.visible : ''}`;
  const navStyles = `${styles.nav} ${isNavOpen ? styles.open : styles.closed}`;

  const toggleNavStyles = `${styles['nav-links']} ${
    isNavOpen ? styles['nav-link-open'] : styles.closed
  }`;

  const plusSymbolStyles = `${styles['plus-symbol']} ${
    isProductsOpen
      ? styles['rotate-clockwise']
      : styles['rotate-counterclockwise']
  }`;

  const toggleSubmenuStyles = `${styles['nav-submenu']} ${
    isProductsOpen ? styles['submenu-open'] : styles['submenu-closed']
  }`;

  return (
    <>
      <button
        className={styles['menu-button']}
        id="btnNav"
        type="button"
        onClick={toggleNav}
      >
        <i className="material-icons">menu</i>
      </button>
      <div
        className={overlayStyles}
        onClick={toggleNav}
      />
      <nav className={navStyles}>
        <div className={toggleNavStyles}>
          <button
            className={styles['nav-closeButton']}
            onClick={toggleNav}
          >
            <i className="material-icons">close</i>
          </button>
          <Link
            to={loginLink}
            className={styles['nav-link']}
            onClick={toggleNav}
          >
            <i className="material-icons">account_circle</i>
            Mi Cuenta
          </Link>
          <Link
            to="/"
            className={styles['nav-link']}
            onClick={toggleNav}
          >
            <i className="material-icons">home</i>
            Inicio
          </Link>
          <div
            className={`${styles['nav-link']} ${styles['nav-products']}`}
            onClick={toggleProducts}
          >
            <i className="material-icons">info</i>
            Información
            <div className={plusSymbolStyles}>
              <i className="material-icons">add</i>
            </div>
          </div>
          <div className={toggleSubmenuStyles}>
            <Link
              to="/product-info/waterfilters"
              onClick={toggleNav}
            >
              Filtros de Agua
            </Link>
            <Link
              to="/product-info/cookwaresets"
              onClick={toggleNav}
            >
              Juegos de Utensilios de Cocina
            </Link>
            <Link
              to="/product-info/accessories"
              onClick={toggleNav}
            >
              Accesorios
            </Link>
          </div>
          <Link
            to="/shop"
            className={styles['nav-link']}
            onClick={toggleNav}
          >
            <i className="material-icons">shopping_bag</i>
            Comercio
          </Link>
          <Link
            to="/cart"
            className={styles['nav-link']}
            onClick={toggleNav}
          >
            <i className="material-icons">shopping_cart</i>
            <span>Mi Cesta</span>
            <span className={styles.badge}>{cartQuantity}</span>
          </Link>
          <Link
            to="/contact"
            className={styles['nav-link']}
            onClick={toggleNav}
          >
            <i className="material-icons">contact_support</i>
            Contacto
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileNavigation;
