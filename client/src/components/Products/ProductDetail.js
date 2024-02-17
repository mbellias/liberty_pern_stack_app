import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { fetchAddToCart } from '../../store/cart-actions';
import Card from '../UI/Card';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const products = useSelector((state) => state.products.products);
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!products || products.length === 0) {
    return <p className={styles.loading}>Loading...</p>;
  }

  const currentProduct = products.find(
    (product) => product.id === parseInt(productId, 10)
  );

  if (!currentProduct) {
    return <p>Product not found</p>;
  }

  const { id, name, image_url, price, index } = currentProduct;

  const handleAddToCart = () => {
    dispatch(fetchAddToCart({ id, quantity: 1 }));
  };

  const handleBack = () => {
    const newIndex = index === 0 ? products.length - 1 : index - 1;
    const newProductId = products[newIndex].id;
    navigate(`/shop/${newProductId}`);
  };

  const handleForward = () => {
    const newIndex = index === products.length - 1 ? 0 : index + 1;
    const newProductId = products[newIndex].id;
    navigate(`/shop/${newProductId}`);
  };

  return (
    <div className={styles.container}>
      <NavLink
        to="/shop"
        className={styles.back}
      >
        <i className="material-icons">arrow_back_ios</i>
      </NavLink>
      <Card className={styles.card}>
        <h3 className={styles.title}>{name}</h3>
        <img
          className={styles.image}
          src={image_url}
          alt={name}
        />
        <span className={styles.price}>${parseFloat(price).toFixed(2)}</span>
        <button
          className={styles['add-to-cart']}
          onClick={handleAddToCart}
        >
          + Añadir al Carrito
        </button>
        <button
          className={styles['back-button']}
          onClick={handleBack}
        >
          &#8249;
        </button>
        <button
          className={styles['forward-button']}
          onClick={handleForward}
        >
          &#8250;
        </button>
      </Card>
    </div>
  );
};

export default ProductDetail;
