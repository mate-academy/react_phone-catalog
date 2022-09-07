import { Link } from 'react-router-dom';
import { Product } from '../../Helpers/types/Product';
import './ProductCard.scss';
import { ToCartButton } from '../ToCartButton/ToCartButton';
import { ToFavButton } from '../ToFavButton/ToFavButton';
import { findNavItem } from '../../Helpers/navItems';
import { deductDiscount } from '../../Helpers/functions/deductDiscount';
import { BASE_URL } from '../../Helpers/api/api';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id, imageUrl, name, price, discount, capacity, ram, screen, type,
  } = product;

  const navLink = findNavItem(type)?.link;

  const specs = [
    { title: 'Screen', value: screen },
    { title: 'Capacity', value: capacity },
    { title: 'RAM', value: ram },
  ];

  return (
    <div className="ProductCard product">
      <Link to={`${navLink}/${id}`}>
        <img
          src={`${BASE_URL}/${imageUrl}`}
          alt="productImage"
          className="ProductCard__image"
        />
        <h2 className="ProductCard__name body-text">{name}</h2>
      </Link>
      <div className="product__price product__price--ProductCard">
        <p className="title title--sub">
          {`$${deductDiscount(product)}`}
        </p>
        {discount !== 0 && (
          <p className="body-text product__price-discount">
            {`$${price}`}
          </p>
        )}
      </div>

      <div className="product__details product__details--ProductCard">
        {specs.map(({ title, value }) => (
          <div
            className="product__details-pair"
            key={title}
          >
            <p className="text">{title}</p>
            <p className="text text--dark">{value}</p>
          </div>
        ))}
      </div>

      <div className="product__actions">
        <ToCartButton id={id} product={product} isLarge={false} />
        <ToFavButton id={id} product={product} isLarge={false} />
      </div>
    </div>
  );
};
