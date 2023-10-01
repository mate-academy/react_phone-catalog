import { useContext, useEffect } from 'react';
import { ProductContext } from '../../ProductContext';

import styles from './ProductCard.module.scss';
import Favourites from '../../img/icons/Favourites.svg';
import FavouritesRed from '../../img/icons/FavouritesRed.svg';

import { numberToCurrency } from '../../utils/numberToCurrency';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Product } from '../../types/Product';

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    cartProducts,
    setCartProducts,
    favouritesProducts,
    setFavouritesProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    localStorage.setItem('Favourit', JSON.stringify(favouritesProducts));
  }, [favouritesProducts]);

  const isSelected = cartProducts.some(prod => prod.id === product.id);
  const isFavourit = favouritesProducts.some(prod => prod.id === product.id);

  const toggleCart = () => {
    if (isSelected) {
      setCartProducts(prev => prev.filter(prod => prod.id !== product.id));
    } else {
      setCartProducts(prev => [...prev, product]);
    }
  };

  const toggleFavourit = () => {
    if (isFavourit) {
      setFavouritesProducts(prev => prev
        .filter(prod => prod.id !== product.id));
    } else {
      setFavouritesProducts(prev => [...prev, product]);
    }
  };

  return (
    <div key={product.id} className={styles.productCard}>
      <img
        className={styles.productImg}
        src={`./_new/${product.image}`}
        alt="product"
      />
      <h3 className={`bodyText ${styles.productTitle}`}>{product.name}</h3>
      <h2>
        {numberToCurrency(product.price)}
        <s className={styles.fullPrice}>
          {numberToCurrency(product.fullPrice)}
        </s>
      </h2>
      <div className={`smallText ${styles.specificationsWrapper}`}>
        <div className={styles.specifications}>
          <p className={styles.specificationsName}>Screen</p>
          <p>{product.screen}</p>
        </div>
        <div className={styles.specifications}>
          <p className={styles.specificationsName}>Capacity</p>
          <p>{product.capacity}</p>
        </div>
        <div className={styles.specifications}>
          <p className={styles.specificationsName}>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>
      <div className={styles.btns}>
        <Button
          text={isSelected ? 'Added to cart' : 'Add to cart'}
          onClick={toggleCart}
          isSelected={!!isSelected}
        />
        <Icon
          icon={isFavourit ? FavouritesRed : Favourites}
          alt="Favourites"
          stylesName={styles.btnsIcon}
          onClick={toggleFavourit}
        />
      </div>
    </div>
  );
};
