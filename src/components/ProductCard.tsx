import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { Button } from './Button';
import { ButtonType } from '../types/ButtonType';
import { ProductsCardType } from '../types/ProductsCardType';

import '../styles/blocks/productCard.scss';

type Props = {
  product: Product;
  transform?: string;
  type: ProductsCardType;
};

export const ProductCard: React.FC<Props> = ({ product, transform, type }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    category,
    itemId,
  } = product;

  return (
    <div className="productCard" data-cy="cardsContainer" style={{ transform }}>
      <div className="productCard__container">
        <Link to={`/${category}/${itemId}`}>
          <img
            src={`./_new/${image}`}
            alt={name}
            className="productCard__image"
          />

          <h3 className="productCard__title">{name}</h3>
        </Link>

        <div className="productCard__price">
          {type === ProductsCardType.DISCOUNT ? (
            <>
              <span className="productCard__price-main">{`$${price}`}</span>
              <span className="productCard__price-discount">
                {`$${fullPrice}`}
              </span>
            </>
          ) : (
            <span className="productCard__price-main">{`$${fullPrice}`}</span>
          )}
        </div>

        <ul className="productCard__info">
          <li className="productCard__text">
            <span className="productCard__text-title">Screen</span>
            <span className="productCard__text-value">{screen}</span>
          </li>

          <li className="productCard__text">
            <span className="productCard__text-title">Capacity</span>
            <span className="productCard__text-value">{capacity}</span>
          </li>

          <li className="productCard__text">
            <span className="productCard__text-title">RAM</span>
            <span className="productCard__text-value">{ram}</span>
          </li>
        </ul>

        <div className="productCard__buttons">
          <Button content={ButtonType.TEXT}>Add to cart</Button>

          <Button content={ButtonType.FAVOURITES} data-cy="addToFavorite" />
        </div>
      </div>
    </div>
  );
};
