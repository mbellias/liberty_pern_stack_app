import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCart } from '../../store/cart-actions';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Card from '../UI/Card';
import styles from './Cart.module.css';

const Cart = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems
    ? cartItems.reduce((total, item) => total + item.totalPrice, 0)
    : 0;

  let cartIsValid = true;

  const cartItemsLength = cartItems ? cartItems.length : 0;

  if (cartItemsLength === 0) {
    cartIsValid = false;
  }

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch(fetchGetCart());
  }, [dispatch]);

  const overlayClasses = isModalVisible ? styles.overlay : '';

  return (
    <>
      <Card>
        <div className={overlayClasses}></div>
        <ul className={styles.cart}>
          <h3>Mi Cesta Comercial</h3>
          {cartItemsLength === 0 ? (
            <p>La cesta comercial está vacía.</p>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                index={index}
                item={{
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  totalPrice: item.totalPrice,
                }}
              />
            ))
          )}
        </ul>
        <span className={styles.total}>
          <h4>Cesta Total: ${cartTotal.toFixed(2)}</h4>
        </span>
        <button
          className={styles.confirm}
          onClick={openModal}
          disabled={!cartIsValid}
        >
          Confirmar Pedido
        </button>
        {isModalVisible && <Checkout onClose={() => setModalVisible(false)} />}
      </Card>
    </>
  );
};

export default Cart;
