import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchAddToCart,
  fetchGetCart,
  fetchRemoveFromCart,
} from '../../store/cart-actions';
import styles from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { name, quantity, price, totalPrice, id } = props.item;

  const handleRemove = () => {
    dispatch(fetchRemoveFromCart(id));
  };

  const handleAdd = () => {
    dispatch(fetchAddToCart({ id, quantity: 1 }));
  };

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch]);

  const key = id || props.index;

  return (
    <li
      key={key}
      className={styles['cart-item']}
    >
      <div className={styles['cart-item-details']}>
        <h4>{name}</h4>
        <span>${parseFloat(price).toFixed(2)}</span>
      </div>
      <div className={styles['cart-item-details-2']}>
        <span>x{parseInt(quantity)}</span>
        <span>Total: {parseFloat(totalPrice).toFixed(2)}</span>
        <div className={styles.buttons}>
          <button onClick={handleRemove}>-</button>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
