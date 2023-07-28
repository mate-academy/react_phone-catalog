/* eslint-disable max-len */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProductPath } from '../../helpers/getProductPath';
import './ProductCard.scss';

type Props = {
  product: Product,
  index: number,
};

const getGridColumn = (index: number) => {
  const itemsInRow = 4;
  const rowIndex = index % itemsInRow;
  const start = rowIndex * 6 + 1;
  const end = rowIndex * 6 + 6;

  return `${start}-${end}`;
};

export const ProductCard: FC<Props> = ({ product, index }) => {
  const {
    imageUrl,
    name,
    snippet,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  // console.log(getProductPath(product));

  // const generateSlugForProduct = (
  //   { type1, id1 }: Pick<Product, 'type1' | 'id1'>,
  // ) => {
  //   let directory: string;

  //   switch (type1) {
  //     case 'phone':
  //       directory = 'phones';
  //       break;
  //     case 'tablet':
  //       directory = 'tablets';
  //       break;
  //     case 'accessory':
  //       directory = 'accessories';
  //       break;
  //     default:
  //       return '/';
  //   }

  //   return `/${directory}/${id1}`;
  // };

  // const slug = generateSlugForProduct({ type, id });
  // const { pathname } = useLocation();
  const discountPrice = Math.round(price * (1 - 0.01 * discount));

  return (
    <div className={`product-card grid__item grid__item--desktop-${getGridColumn(index)}`}>
      <Link to={`/${getProductPath(product)}`} className="product-card__link">
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            src={imageUrl}
            alt={snippet}
          />
        </div>
        <h4 className="product-card__title">{name}</h4>
      </Link>
      <div className="product-card__price-container">
        {discount ? (
          <>
            <div className="product-card__price">{`$${discountPrice}`}</div>
            <div className="product-card__price product-card__price--crossed-out">{`$${price}`}</div>
          </>
        ) : (
          <div className="product-card__price">{`$${price}`}</div>
        )}
      </div>

      <div className="product-card__spec">
        <ul className="product-card__spec-list">
          <li className="product-card__spec-name">Screen</li>
          <li className="product-card__spec-name">Capacity</li>
          <li className="product-card__spec-name">RAM</li>
        </ul>
        <ul className="product-card__spec-list">
          <li className="product-card__spec-value">{screen}</li>
          <li className="product-card__spec-value">{capacity}</li>
          <li className="product-card__spec-value">{ram}</li>
        </ul>
      </div>

      <div className="product-card__actions">
        <button
          type="button"
          className="product-card__add-to-cart rectangular-button"
        >
          Add to cart
        </button>
        <div className="product-card__button-container">
          <button
            type="button"
            className="product-card__add-to-favourites square-button square-button--medium"
          >
            <img src="icons/favourites.svg" alt="next button" />
          </button>
        </div>
      </div>
    </div>
  );
};
