import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { Button } from '../Button/Button';

type Props = {
  product: Product,
};

function makeCharFormated(char: string) {
  const numericPart = char.match(/\d+/);
  const unitPart = char.match(/[A-Za-z]+/);

  if (numericPart && unitPart) {
    return `${numericPart[0]} ${unitPart[0]}`;
  }

  return char;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    // age,
    id,
    type,
    imageUrl,
    name,
    // snippet,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const productPath = `/${type}s/${id}`;

  const priceWithDiscount = useMemo(() => {
    return calculateDiscount(product);
  }, []);

  return (
    <div className="ProductCard" data-cy="cardsContainer">
      <div className="ProductCard__image-container">
        <Link to={productPath}>
          <img
            className="ProductCard__image"
            src={imageUrl}
            alt={name}
          />
        </Link>
      </div>

      <div className="ProductCard__title">
        <Link to={productPath}>
          {name}
        </Link>
      </div>

      <div className="ProductCard__price">
        <h2 className="ProductCard__price-main">
          {`$${priceWithDiscount}`}
        </h2>

        {!!discount && (
          <p className="ProductCard__price-discount">
            {`$${price}`}
          </p>
        )}
      </div>

      <div className="ProductCard__characters">
        <div className="ProductCard__characters__row">
          <p className="ProductCard__characters__row--key">
            Screen
          </p>
          <p className="ProductCard__characters__row--value">
            {makeCharFormated(screen) || '-'}
          </p>
        </div>

        <div className="ProductCard__characters__row">
          <p className="ProductCard__characters__row--key">
            Capacity
          </p>
          <p className="ProductCard__characters__row--value">
            {makeCharFormated(capacity) || '-'}
          </p>
        </div>

        <div className="ProductCard__characters__row">
          <p className="ProductCard__characters__row--key">
            RAM
          </p>
          <p className="ProductCard__characters__row--value">
            {makeCharFormated(ram) || '-'}
          </p>
        </div>
      </div>

      <div className="ProductCard__buttons">
        <Button
          variant="cart"
        >
          Add to cart
        </Button>

        <Button variant="favourite" />
      </div>
    </div>
  );
};
