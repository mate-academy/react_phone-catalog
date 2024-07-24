import classNames from 'classnames';
import { Button } from '../Button/Button';
import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';
import { useFavouriteProducts } from '../../store/FavouriteProductsContext';

import { FavouritesButton } from '../FavouritesButton/FavouritesButton';

type Props = {
  product: Product;
  type?: string;
};

export const ProductCard: React.FC<Props> = ({ product, type }) => {
  const { id, name, fullPrice, price, screen, capacity, ram, image } = product;
  const techValueClassName = classNames(
    'text-small',
    styles.productCard__techValue,
  );

  const { handleFavourites } = useFavouriteProducts();

  return (
    <div className={styles.productCard}>
      <a className={styles.productCard__imgWrapper}>
        <img className={styles.productCard__img} src={image} alt="product" />
      </a>
      <div>
        <p className="text-body">{name}</p>

        {type === 'brandNew' ? (
          <h3>${fullPrice}</h3>
        ) : (
          <div className={styles.productCard__priceWrapper}>
            <h3>${price}</h3>
            <h3 className={styles.productCard__fullPrice}>${fullPrice}</h3>
          </div>
        )}

        <div className={styles.productCard__divider}></div>

        <div className={styles.productCard__information}>
          <div className={styles.productCard__info}>
            <p className="text-small">Screen</p>
            <p className={techValueClassName}>{screen}</p>
          </div>
          <div className={styles.productCard__info}>
            <p className="text-small">Capacity</p>
            <p className={techValueClassName}>{capacity}</p>
          </div>
          <div className={styles.productCard__info}>
            <p className="text-small">RAM</p>
            <p className={techValueClassName}>{ram}</p>
          </div>
        </div>
        <div className={styles.productCard__btns}>
          <Button text="Add to cart" />
          <div onClick={() => handleFavourites(product)}>
            <FavouritesButton productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
