import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGetCart } from '../../store/cart-actions';
import styles from './CartButton.module.css';

const CartButton = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch]);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnStyles = `${styles.cartButton} ${
    btnIsHighlighted ? styles.bump : ''
  }`;

  useEffect(() => {
    if (cartQuantity === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartQuantity]);

  return (
    <Link
      to="/cart"
      className={btnStyles}
    >
      <span>Mi Cesta</span>
      <span className={styles.badge}>{cartQuantity}</span>
    </Link>
  );
};

export default CartButton;
