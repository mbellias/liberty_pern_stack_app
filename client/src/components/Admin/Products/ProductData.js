import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../../store/auth-slice';
import UpdateProductPrice from './UpdateProductPrice';
import BASE_URL from '../../../config';
import styles from './ProductData.module.css';

const ProductData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/get-all-products`,
          {
            role: user.role,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(logoutAsync());
        } else {
          setError(error.message);
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, dispatch]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <UpdateProductPrice />
      <h2 className={styles.title}>Product Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td data-label="ID">{product.id}</td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Price">{product.price}</td>
              <td data-label="Image URL">{product.image_url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductData;
