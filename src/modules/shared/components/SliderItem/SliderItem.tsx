import { Product } from '@/types';
import React, { useEffect, useState } from 'react';
import styles from '../../../../modules/HomePage/components/SliderComponent.module.scss';
import {
  addToCart,
  getFavorites,
  toggleFavorite,
  getCart,
  removeFromCart,
} from '@/modules/shared/components/utils/StorageHelper/storageHelper';
import { Link } from 'react-router-dom';

type SliderItemProps = {
  item: Product;
  showDiscount: boolean;
};

const SliderItem: React.FC<SliderItemProps> = ({ item, showDiscount }) => {
  const [isFav, setIsFav] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const favs = getFavorites();
    const cartItems = getCart();

    setIsFav(favs.includes(item.id));
    setIsInCart(cartItems.some((cartItem: Product) => cartItem.id === item.id));
  }, [item.id]);

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
    setIsFav(!isFav); // Оновлюємо кнопку візуально
  };

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(item.id); // Видаляємо
      setIsInCart(false); // Миттєво оновлюємо вигляд кнопки
    } else {
      addToCart(item); // Додаємо
      setIsInCart(true); // Миттєво оновлюємо вигляд кнопки
      // alert('Додано в корзину!'); // Алерт краще замінити на тостер або прибрати, якщо змінюється кнопка
    }
  };

  return (
    <div className={styles.SliderComponent__item}>
      <Link to={`/${item.category}/${item.itemId}`} className={styles.SliderComponent__item__imageContainer}>
        <img src={item.image} alt={item.name} />
      </Link>
      <div className={styles.SliderComponent__item__infoContainer}>
        <Link
          to={`/${item.category}/${item.itemId}`}
          className={styles.SliderComponent__item__itemName}
        >
          {item.name}
        </Link>
        <div className={styles.SliderComponent__item__priceContainer}>
          <div className={styles.SliderComponent__item__fullPrice}>
            ${item.price}
          </div>
          {showDiscount && (
            <div className={styles.SliderComponent__item__price}>
              ${item.fullPrice}
            </div>
          )}
        </div>
        <div className={styles.SliderComponent__item__divider}></div>
        <div className={styles.SliderComponent__item__specContainer}>
          <div>
            <span className={styles.SliderComponent__item__infoName}>
              Screen
            </span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.screen}
            </span>
          </div>
          <div>
            <span className={styles.SliderComponent__item__infoName}>
              Capacity
            </span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.capacity}{' '}
            </span>
          </div>
          <div>
            <span className={styles.SliderComponent__item__infoName}>RAM</span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.ram}{' '}
            </span>
          </div>
        </div>
        <div className={styles.SliderComponent__item__buttonContainer}>
          <button
            onClick={handleCartClick}
            className={`${styles.SliderComponent__item__cartButton} ${
              isInCart ? styles.SliderComponent__item__cartButton__added : ''
            }`}
          >
            {isInCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={handleFav}
            className={styles.SliderComponent__item__favoriteButton}
          >
            <img
              src={isFav ? 'img/icons/red-heart.svg' : 'img/icons/heart.svg'}
              alt="Add to Favorites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
