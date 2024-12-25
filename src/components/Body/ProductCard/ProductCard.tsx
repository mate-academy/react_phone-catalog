import React, { useState } from 'react';
import styles from './ProductCard.module.scss';

interface Product {
  id: number;
  name: string;
  fullPrice?: number;  // Повна ціна (для знижки)
  price: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
}

interface ProductCardProps {
  product: Product;
  showDiscount: boolean;  // Проп для показу знижки
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showDiscount }) => {
  const [cart, setCart] = useState<Product[]>([]);  // Кошик
  const [favorites, setFavorites] = useState<Product[]>([]);  // Улюблені

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => [...prevFavorites, product]);
  };

  return (
    <div className={styles.product_card}>
      <div className={styles.image_container}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.price_section}>
          {/* Якщо showDiscount = true і є fullPrice, показуємо дві ціни */}
          {showDiscount && product.fullPrice ? (
            <p className={styles.price}>
              
              <span className={styles.discounted_price}>${product.price}</span>
              <span className={styles.old_price}>${product.fullPrice}</span>
            </p>
          ) : (
            // Якщо showDiscount = false або немає fullPrice, показуємо тільки поточну ціну
            <p className={styles.discounted_price}>${product.price}</p>  
          )}
        </div>
        <hr className={styles.line} />
        <div className={styles.description}>
          <div className={styles.screen}>
            <p className={styles.description_title}>Screen</p>
            <p className={styles.description_value}>{product.screen}</p>
          </div>
          <div className={styles.capacity}>
            <p className={styles.description_title}>Capacity</p>
            <p className={styles.description_value}>{product.capacity}</p>
          </div>
          <div className={styles.ram}>
            <p className={styles.description_title}>Ram</p>
            <p className={styles.description_value}>{product.ram}</p>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button_cart}
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <button
            className={styles.button_favourite}
            onClick={() => addToFavorites(product)}
          ></button>
        </div>
      </div>
    </div>
  );
};

