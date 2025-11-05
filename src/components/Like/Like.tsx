import { ProductItem } from '../ProductItem';
import React, { useEffect, useState } from 'react';
import { ProductType } from 'types/ProductType';
import styles from './Like.module.scss';
import { NavLink } from 'react-router-dom';
import { CartItem } from 'types/CartItem';

type Props = {
  liked: number[];
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
};

export const Like: React.FC<Props> = ({
  liked,
  handleAddToCart,
  handleAddToLiked,
  cart,
  handleRemoveFromCart,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const likedProduct = products.filter((a: ProductType) =>
    liked.includes(a.id),
  );

  return (
    <div className={styles.main}>
      <div className={styles.home}>
        <NavLink to="/">
          <img src="img/home_icon.svg" alt="button" />
        </NavLink>
        <NavLink to="/">
          <img src="img/arrow_right.svg" alt="button" />
        </NavLink>
        <h1 className={styles.home_text}>Favourites</h1>
      </div>
      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.title_descript}>{liked.length} items</p>

      <div className={styles.products}>
        {likedProduct.map(product => (
          <ProductItem
            cart={cart}
            key={product.id}
            liked={liked}
            product={product}
            handleAddToCart={handleAddToCart}
            handleAddToLiked={handleAddToLiked}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
};
