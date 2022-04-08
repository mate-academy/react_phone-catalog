import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './ProductCard.scss';

// Types
import { Product } from '../../types/Product';

// Components
import { TechSpecs } from '../TechSpecs';
import { CardButtons } from '../CardButtons';

type Props = {
  product: Product;
};

export const ProductCard: FunctionComponent<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    newPrice,
    price,
    screen,
    capacity,
    ram,
    id,
    type,
  } = product;
  const techSpecs = [
    { key: 'Screen', value: screen },
    { key: 'Capacity', value: capacity },
    { key: 'RAM', value: ram },
  ];

  return (
    <div className="ProductCard">
      <Link to={`/${type === 'accessory' ? 'accesori' : type}s/${id}`}>
        <img
          src={imageUrl}
          alt=""
          className="ProductCard__image"
        />
      </Link>

      <p className="ProductCard__title">
        {name}
      </p>

      <div className="ProductCard__price">
        <span className="ProductCard__newPrice">
          {`$${newPrice}`}
        </span>

        {price !== newPrice && (
          <span className="ProductCard__oldPrice">
            {`$${price}`}
          </span>
        )}
      </div>

      <div className="ProductCard__info">
        <TechSpecs techSpecs={techSpecs} isTextSmall />
      </div>

      <CardButtons id={id} size="small" />
    </div>
  );
};
