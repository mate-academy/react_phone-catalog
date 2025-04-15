import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import styles from './CartPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../../components/ProductCard/ProductCard';
import { setSelectedProduct } from '../../store/slices/selectedProductSlice';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { RootState } from '../../store';

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((state: RootState) => state.cartProducts);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart') || '[]';

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        // console.error('Ошибка при разборе favourites из localStorage', e);
      }
    }
  }, [cartProducts]);

  const handleProductClick = (item: Product) => {
    dispatch(setSelectedProduct(item));
    navigate(`/${item.category}/${item.id}`);
  };

  if (!cart.length) {
    return (
      <div className={styles.cartPage}>
        <Breadcrumb type="cart" />
        <h1 className={styles.cartPage__title}>Cart</h1>
        <p className={styles.cartPage__model}> 0 Models</p>
      </div>
    );
  } else {
    return (
      <div className={styles.cartPage}>
        <Breadcrumb type="cart" />
        <h1 className={styles.cartPage__title}>Favourites</h1>
        <p className={styles.cartPage__model}>{cart?.length} Models</p>
        <div className={styles.cartPage__products}>
          {cart.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              onClick={() => handleProductClick(item)}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default CartPage;
