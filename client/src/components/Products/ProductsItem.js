import { useDispatch } from 'react-redux';
import { fetchAddToCart } from '../../store/cart-actions';
import { NavLink } from 'react-router-dom';
import styles from './ProductsItem.module.css';

const ProductsItem = (props) => {
  const dispatch = useDispatch();
  const { name, price, image, id, index } = props;

  const key = id || props.index;

  const handleAddToCart = () => {
    dispatch(fetchAddToCart({ id, quantity: 1 }));
  };

  return (
    <li
      key={key}
      index={index}
      className={styles['product-item']}
    >
      <div>
        <NavLink to={`/shop/${id}`}>
          <img
            src={image}
            alt={name}
            style={{ width: '150px', height: '175px' }}
          />
        </NavLink>
      </div>
      <div>{name}</div>
      <div>${parseFloat(price).toFixed(2)}</div>
      <button
        className={styles['cart-button']}
        onClick={handleAddToCart}
      >
        + Añadir al Carrito
      </button>
    </li>
  );
};

export default ProductsItem;
