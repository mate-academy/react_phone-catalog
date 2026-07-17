import { useState } from 'react';
import styles from './Favorites.module.scss';

type FavoriteItemData = {
  id: string;
  image: string;
  name: string;
  price: number;
};

const INITIAL_FAVORITES: FavoriteItemData[] = [
  {
    id: 'apple-iphone-11-pro-max-64gb-silver',
    image: '/img/phones/apple-iphone-11-pro-max/silver/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Silver',
    price: 1099,
  },
  {
    id: 'apple-iphone-11-pro-max-64gb-spacegray',
    image: '/img/phones/apple-iphone-11-pro-max/spacegray/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Space Gray',
    price: 1099,
  },
];

export const Favorites = () => {
  const [items, setItems] = useState<FavoriteItemData[]>(INITIAL_FAVORITES);

  const handleRemove = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  return (
    <section className={styles.favorites}>
      <h1 className={styles.favorites__title}>Favorites</h1>

      {items.length === 0 ? (
        <p className={styles.favorites__empty}>No favorites yet</p>
      ) : (
        <ul className={styles.favorites__list}>
          {items.map(item => (
            <li key={item.id} className={styles.favorites__item}>
              <button
                type="button"
                className={styles.favorites__remove}
                onClick={() => handleRemove(item.id)}
                aria-label="Remove from favorites"
              >
                &times;
              </button>

              <img
                src={item.image}
                alt={item.name}
                className={styles.favorites__image}
              />

              <p className={styles.favorites__name}>{item.name}</p>
              <p className={styles.favorites__price}>${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
