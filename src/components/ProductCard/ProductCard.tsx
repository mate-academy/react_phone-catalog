import { useState } from 'react';
import { SvgIcon } from '../SvgIcon';
import styles from './ProductCard.module.scss';
import cn from 'classnames';
import { Product } from '../../types/Product';

interface Props {
  product: Product;
}

interface Properties {
  term: string;
  desc: string;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const { name, image, price, fullPrice, screen, capacity, ram, id } = product;

  const properties: Properties[] = [
    { term: 'Screen', desc: screen },
    { term: 'Capacity', desc: capacity },
    { term: 'RAM', desc: ram },
  ];

  const changeFavouriteStatus = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsFavourite(evt.target.checked);
  };

  return (
    <div className={cn(styles['product-card'])}>
      <a href="#" className={cn(styles['product-card__photo-link'])}>
        <img
          className={cn(styles['product-card__photo'])}
          src={image}
          alt={name}
        />
      </a>

      <div className={styles['product-card__wrapper']}>
        <a href="#">
          <h3 className={cn(styles['product-card__title'])}>{name}</h3>
        </a>

        <div className={styles['product-card__price-wrapper']}>
          <p className={cn(styles['product-card__price'])}>${price}</p>
          <p className={cn(styles['product-card__full-price'])}>${fullPrice}</p>
        </div>

        <ul className={cn(styles['product-card__properties-list'])}>
          {properties.map(property => (
            <li key={property.term}>
              <dl className={cn(styles['product-card__definition-list'])}>
                <dt className={cn(styles['product-card__definition-term'])}>
                  {property.term}
                </dt>
                <dd className={cn(styles['product-card__definition-desc'])}>
                  {property.desc}
                </dd>
              </dl>
            </li>
          ))}
        </ul>

        <div className={cn(styles['product-card__actions'])}>
          <button
            className={cn(
              styles['product-card__btn'],
              styles['product-card__btn--cart'],
            )}
          >
            Add to cart
          </button>

          <div>
            <input
              id={`favourites-${id}`}
              type="checkbox"
              onChange={changeFavouriteStatus}
              className={cn(
                styles['product-card__checkbox-favourites'],
                'visually-hidden',
              )}
            />

            <label
              className={cn(
                styles['product-card__btn'],
                styles['product-card__btn--favourites'],
              )}
              htmlFor={`favourites-${id}`}
            >
              {isFavourite ? (
                <SvgIcon type={'heart-like'} />
              ) : (
                <SvgIcon type={'heart'} />
              )}
              <span className="visually-hidden">Change favourite status</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
