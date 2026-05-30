import { Button } from '../../UI';
import styles from './ProductCard.module.scss';
import { ProductParams } from './ProductParams/ProductParams';

import iconFavourite from '../../assets/icons/Favourites.svg';
import iconFavouriteActive from '../../assets/icons/Favourites Filled.svg';
import { useState } from 'react';

const product = {
  id: 194,
  category: 'phones',
  itemId: 'apple-iphone-14-pro-1tb-gold',
  name: 'Apple iPhone 14 Pro 1TB Gold',
  fullPrice: 1740,
  price: 1520,
  screen: "6.1' OLED",
  capacity: '1TB',
  color: 'gold',
  ram: '6GB',
  year: 2022,
  image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
};

/* product object should be props now its just a placeholder ti prevent errors*/

export const ProductCard = (/*{product}*/) => {
  const [selected, setSelected] = useState({
    primary: false,
    favourite: false,
  });
  const onAddButtonClick = () => {
    setSelected(prev => ({ ...prev, primary: !prev.primary }));
  };

  const onFavouriteButtonClick = () => {
    setSelected(prev => ({ ...prev, favourite: !prev.favourite }));
  };

  return (
    <article className={styles.card}>
      <img className={styles.card__image} src={product.image} />
      <h1 className={styles.card__title}>{product.name}</h1>
      <div>
        <p className={styles.card__price}>
          <span
            className={styles.card__price__actual}
          >{`$${product.price}`}</span>
          <div
            className={styles.card__price__withoutDiscount}
          >{`$${product.fullPrice}`}</div>
        </p>
      </div>

      <ProductParams phoneParams={product} />
      <div className={styles.buttonsPlaceholder}>
        <Button
          onClick={onAddButtonClick}
          type="primary"
          state={selected.primary ? 'selected' : 'disabled'}
          size={{
            width: 160,
            height: 40,
          }}
        >
          {selected.primary ? 'Added' : 'Add to cart'}
        </Button>
        <Button
          state={selected.favourite ? 'selected' : 'disabled'}
          type="icon"
          size={{ width: 40, height: 40 }}
          onClick={onFavouriteButtonClick}
        >
          <img
            src={selected.favourite ? iconFavouriteActive : iconFavourite}
            alt="icon"
          ></img>
        </Button>
      </div>
    </article>
  );
};
