/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import { Product } from '../utils/types/Product';
import { ProductActions } from './ProductActions';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (

    <article className="card" data-cy="cardsContainer">
      <Link to={`/phones/${product.itemId}`} className="link">
        <div className="card__image">
          <img src={`/_new/${product.image}`} alt="" />
        </div>

        <div className="card__title">{product.name}</div>
        <div className="card__price">
          <span className="card__price--with-discont">
            $
            {(product.name.includes('11') && product.fullPrice)
            || product.price}
          </span>

          <span className="card__price--without-discont">

            {!product.name.includes('11') && `$${product.fullPrice}`}
          </span>

        </div>
      </Link>
      <div className="card__characteristics">
        <div className="card__characteristics--item">
          <div className="card__characteristics--title">Screen</div>
          <div className="card__characteristics--characteristic">
            {product.screen}

          </div>
        </div>

        <div className="card__characteristics--item">
          <div className="card__characteristics--title">Capacity</div>
          <div className="card__characteristics--characteristic">
            {product.capacity}

          </div>
        </div>

        <div className="card__characteristics--item">
          <div className="card__characteristics--title">Ram</div>
          <div className="card__characteristics--characteristic">
            {product.ram}

          </div>
        </div>

        <ProductActions product={product} />

      </div>
    </article>

  );
};
