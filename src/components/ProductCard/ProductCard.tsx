import classNames from 'classnames';
import { Button } from '../Button';
import styles from './ProductCard.module.scss';

import { Product } from '../../types/Product';

import { FavouritesButton } from '../FavouritesButton/FavouritesButton';
import { Link, useSearchParams } from 'react-router-dom';
import { PriceBlock } from '../PriceBlock';
import { useShoppingCart } from '../../store/CartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const { addToCart } = useShoppingCart();
  const [searchParams] = useSearchParams();

  const techValueClassName = classNames(
    'text-small',
    styles.productCard__techValue,
  );

  const link = `/${category}/${itemId}`;

  return (
    <div className={styles.productCard}>
      <Link
        to={link}
        state={{ search: searchParams.toString() }}
        className={styles.productCard__imgWrapper}
      >
        <img className={styles.productCard__img} src={image} alt="product" />
      </Link>
      <div>
        <Link to={link} state={{ search: searchParams.toString() }}>
          <p className={classNames(styles.productCard__text, 'text-body')}>
            {name}
          </p>
        </Link>

        <PriceBlock price={fullPrice} priceDiscount={price} />

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
          <div onClick={() => addToCart(product)}>
            <Button product={product} text="Add to cart" />
          </div>

          <FavouritesButton product={product} />
        </div>
      </div>
    </div>
  );
};
