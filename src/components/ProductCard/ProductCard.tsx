import { FC, useState } from 'react';
import classNames from 'classnames';
import { Button } from '../Button/Button';
import { Product } from '../../types/Product';
import { SectionNames } from '../../types/SectionNames';

import './ProductCard.scss';

type Props = {
  sectionTitle: SectionNames;
  product: Product;
};

export const ProductCard: FC<Props> = ({ sectionTitle, product }) => {
  const [isTest, setIsTest] = useState(false);

  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="card" data-cy="cardsContainer">
      <img
        src={`_new/${image}`}
        alt={name}
        className="card__img"
      />

      <h2 className="card__title">{name}</h2>

      <div className="card__price">
        {sectionTitle === SectionNames.BrandNew ? (
          <p className="card__price-regular">{`$${fullPrice}`}</p>
        ) : (
          <>
            <p className="card__price-regular">{`$${price}`}</p>
            <p className="card__price-discount">{`$${fullPrice}`}</p>
          </>
        )}

      </div>

      <div className="card__specs-container">
        <div className="card__specs">
          <p className="card__specs-title">Screen</p>
          <p className="card__specs-value">{screen}</p>
        </div>
        <div className="card__specs">
          <p className="card__specs-title">Capacity</p>
          <p className="card__specs-value">{capacity}</p>
        </div>
        <div className="card__specs">
          <p className="card__specs-title">RAM</p>
          <p className="card__specs-value">{ram}</p>
        </div>
      </div>

      <div className="card__buttons">
        <Button
          content={isTest ? 'Added to cart' : 'Add to cart'}
          className={classNames('add-to-cart', {
            'button--add-to-cart--active': isTest,
          })}
        />
        <Button
          content="icon"
          iconType={isTest ? 'favorites-filled' : 'favorites'}
          className={classNames('favorites', {
            'button--favorites--active': isTest,
          })}
          event={() => setIsTest(curr => !curr)}
        />
      </div>
    </div>
  );
};
