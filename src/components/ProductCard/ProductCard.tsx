import { Link, useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { backToTop, BASE_URL } from '../../utils/constants';
import { ButtonForCard } from '../ButtonForCard';

import './ProductCard.scss';

type Props = {
  product: Product;
  type?: string;
};

export const ProductCard: React.FC<Props> = ({ product, type }) => {
  const {
    image, screen, capacity, ram,
    fullPrice, name, price, itemId, category,
  } = product;

  const [searchParams] = useSearchParams();

  return (
    <article className="product">
      <div
        className="product__card"
      >
        <Link
          to={`/${category}/${itemId}`}
          state={{ search: searchParams.toString() }}
          className="product__image-link"
          onClick={backToTop}
        >
          <img
            src={`${BASE_URL}/${image}`}
            alt={name}
            className="product__image"
          />
        </Link>

        <Link
          to={`/${category}/${itemId}`}
          className="product__name"
          onClick={backToTop}
        >
          {name}
        </Link>

        {type === 'hotPrice'
          ? (
            <div className="product__price">
              <p>{`$${price} `}</p>
              <p className="product__price--old">{`$${fullPrice}`}</p>
            </div>
          ) : (
            <p className="product__price">{`$${price}`}</p>
          )}

        <div className="product__description">
          <div className="product__feature">
            <p className="product__feature-name">
              Screen
            </p>

            <p className="product__feature-inducator">
              {screen}
            </p>
          </div>

          <div className="product__feature">
            <p className="product__feature-name">
              Capacity
            </p>

            <p className="product__feature-inducator">
              {capacity}
            </p>
          </div>

          <div className="product__feature">
            <p className="product__feature-name">
              RAM
            </p>

            <p className="product__feature-inducator">
              {ram}
            </p>
          </div>
        </div>

        <ButtonForCard product={product} />
      </div>
    </article>
  );
};
