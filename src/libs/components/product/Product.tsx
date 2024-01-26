import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';

import {
  IMG_ROOT_PATH,
} from '../../enums';
import { ProductType } from '../../types';
import { AddToCart } from '../AddToCart';
import { AddToFavorite } from '../AddToFavorite';
import { Characteristics } from '../characteristics/Characteristics';

type Props = React.HTMLProps<HTMLElement> & {
  product: ProductType,
  className?: string,
};

export const Product: React.FC<Props> = ({ product, className, ...rest }) => {
  const { pathname, search } = useLocation();

  const {
    name, category, phoneId, fullPrice, price, screen, capacity, ram, image,
  } = product;

  const productUrl = `/${category}/${phoneId}`;
  const productImgPath = `${IMG_ROOT_PATH}/${image}`;

  return (
    <article
      className={classNames(className, 'product')}
      {...rest}
      data-cy="cardsContainer"
    >
      <Link
        to={productUrl}
        state={{ pathname, search }}
        className="product__image-container"
      >
        <img
          className="product__image"
          src={productImgPath}
          alt={name}
        />
      </Link>

      <div className="product__info">
        <Link
          to={productUrl}
          state={{ pathname, search }}
          className="product__title"
        >
          {name}
        </Link>

        <div className="product__prices">
          <div className="product__new-price">
            {`$${price}`}
          </div>
          <div className="product__old-price">
            {`$${fullPrice}`}
          </div>
        </div>
      </div>

      <Characteristics characteristics={{ screen, capacity, ram }} />

      <div className="product__controls">
        <AddToCart
          product={product}
          className="product__btn-add-to-cart"
        />

        <AddToFavorite
          product={product}
          className="product__btn-add-to-favorite"
        />
      </div>
    </article>
  );
};
