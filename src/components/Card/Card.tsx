import React from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

import { AddButton } from '../buttons/AddButton';
import { FavoriteButton } from '../buttons/FavoriteButton';

import classes from './Card.module.scss';
import { addSpaceInText } from '../../shared/workWithString';

type Props = {
  product: Product;
};

export const Card: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  return (
    <article className={classes.Card} data-cy="cardsContainer">
      <Link
        to={`/${category}/${itemId}`}
        title="More details"
        className={classes['Card__img-container']}
      >
        <img className={classes.Card__img} src={image} alt={name} />
      </Link>

      <div className={classes['Card__main-information']}>
        <Link to={`/${category}/${itemId}`} title="More details">
          <h5 className={classes.Card__title}>{name}</h5>
        </Link>

        <div className={classes.Card__price}>
          <p>{`$${price}`}</p>
          <div className={classes['Card__full-price']}>
            {fullPrice && <p>{`$${fullPrice}`}</p>}
            {fullPrice && <p>{`$${fullPrice}`}</p>}
          </div>
        </div>
      </div>

      <div className={classes.Card__details}>
        <div className={classes.Card__detail}>
          <p>Screen</p>
          <p>{addSpaceInText(screen)}</p>
        </div>
        <div className={classes.Card__detail}>
          <p>Capacity</p>
          <p>{addSpaceInText(capacity)}</p>
        </div>
        <div className={classes.Card__detail}>
          <p>RAM</p>
          <p>{addSpaceInText(ram)}</p>
        </div>
      </div>

      <div className={classes.Card__buttons}>
        <AddButton id={product.itemId} />
        <FavoriteButton id={product.itemId} />
      </div>
    </article>
  );
};
