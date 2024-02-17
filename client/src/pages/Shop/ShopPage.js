import React from 'react';
import { Outlet } from 'react-router-dom';
import Products from '../../components/Products/Products';
import styles from './ShopPage.module.css';

const ShopPage = () => {
  return (
    <div>
      <h2 className={styles.heading}>Comercio</h2>
      <Products />
      <Outlet />
    </div>
  );
};

export default ShopPage;
