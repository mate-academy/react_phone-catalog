import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import type { Product } from '../../types/Product';
import { WishlistButton } from '../Ui/WishlistButton';
import { Button } from '../Ui/Button/Button';
import { useFavourites } from '../../hooks/useFavourites';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const {
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  const productLink = `/${category}/${itemId}`;

  const descriptions = [
    { label: 'Screen', value: screen },
    { label: 'Capacity', value: capacity },
    { label: 'RAM', value: ram },
  ];

  const { isInFavourites, toggleFavourites } = useFavourites();

  return (
    <div className={cx('product-card')}>
      <Link to={productLink} className={cx('product-card__image-box')}>
        <img
          className={cx('product-card__image')}
          src={`/${image}`}
          alt={name}
        />
      </Link>
      <Link to={productLink} className={cx('product-card__title')}>
        {name}
      </Link>
      <div className={cx('product-card__prices')}>
        <div className={cx('product-card__price')}>${price}</div>
        {fullPrice > price && (
          <div className={cx('product-card__old-price')}>${fullPrice}</div>
        )}
      </div>
      <hr className={cx('product-card__divider')} />
      <div className={cx('product-card__descriptions')}>
        {descriptions.map(({ label, value }) => (
          <div key={label} className={cx('product-card__description')}>
            <div className={cx('product-card__label')}>{label}</div>
            <div className={cx('product-card__vale')}>{value}</div>
          </div>
        ))}
      </div>
      <div className={cx('product-card__buttons')}>
        <Button onClick={() => {}} textAfterClick={'Added'}>
          Add to cart
        </Button>
        <WishlistButton
          selected={isInFavourites(itemId)}
          onClick={() => toggleFavourites(itemId)}
        />
      </div>
    </div>
  );
};
