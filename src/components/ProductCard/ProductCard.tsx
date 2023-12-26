import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';

import './ProductCard.scss';
import { ProductCardButtons } from '../ProductCardButtons';
import { BASE_URL } from '../../utils/httpClient';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <div className="ProductCard" data-cy="cardsContainer">
      <div className="ProductCard__container">
        <Link
          to={`/${product.category}/${product.itemId}`}
          state={{
            from: location.pathname,
            search: searchParams.toString(),
          }}
          className="ProductCard__link"
        >
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="ProductCard__img"
          />

          <div className="ProductCard__name">
            {product.name}
          </div>
        </Link>

        <div className="ProductCard__info">
          <div className="ProductCard__price">
            <div className="ProductCard__price--discount">
              {`$${product.price}`}
            </div>

            <div className="ProductCard__price--fullPrice">
              {`$${product.fullPrice}`}
            </div>
          </div>

          <div className="ProductCard__line" />

          <div className="ProductCard__properties">
            <div className="ProductCard__property">
              <div className="ProductCard__property--normal">
                Screen
              </div>
              <div className="ProductCard__property--strong">
                {product.screen}
              </div>
            </div>

            <div className="ProductCard__property">
              <div className="ProductCard__property--normal">
                Capacity
              </div>
              <div className="ProductCard__property--strong">
                {product.capacity}
              </div>
            </div>

            <div className="ProductCard__property">
              <div className="ProductCard__property--normal">
                Ram
              </div>
              <div className="ProductCard__property--strong">
                {product.ram}
              </div>
            </div>
          </div>
        </div>

        <ProductCardButtons productId={product.itemId} />
      </div>
    </div>
  );
};
