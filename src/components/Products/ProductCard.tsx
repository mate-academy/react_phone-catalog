import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { getPath } from '../../helpers/getPath';
import { Product } from '../../types/Product';
import { ProductCardDescription } from './ProductCardDescription';

type Props = {
  products: Product[]
};

export const ProductCard: React.FC<Props> = ({ products }) => {
  const location = useLocation();

  const wrap
  = location.pathname === '/phones'
  || location.pathname === '/tablets'
  || location.pathname === '/accessories'
  || location.pathname === '/favorites';

  return (
    <div
      data-cy="cardsContainer"
      className={classNames('product-content',
        { 'product-content-isWrap': wrap })}
    >
      {products.map(product => {
        const {
          id,
          type,
          name,
          imageUrl,
          age,
        } = product;

        return (
          <div
            key={age}
            className="product-content__card"
          >
            <Link
              to={getPath({ type, id })}
            >
              <img
                className="product-content__card__img"
                src={`/${imageUrl}`}
                alt={name}
              />

              <p className="product-content__card__title">{name}</p>
            </Link>

            <ProductCardDescription product={product} />

          </div>
        );
      })}

    </div>
  );
};
