import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../store/products-slice';
import axios from 'axios';
import Card from '../UI/Card';
import ProductsItem from './ProductsItem';
import BASE_URL from '../../config';
import styles from './Products.module.css';

const Products = () => {
  const productsList = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        dispatch(setProducts(response.data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card>
      <ul className={styles['products-list']}>
        {productsList.map((product, index) => (
          <ProductsItem
            key={product.id}
            index={index}
            id={product.id}
            image={product.image_url}
            name={product.name}
            price={product.price}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Products;
