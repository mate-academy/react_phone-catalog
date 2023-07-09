/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import { Product } from '../utils/types/Product';
import { ProductActions } from './ProductActions';
import { cardCharacteeristics } from '../utils/listsNames';
import { Characteristics } from './Characteristics';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (

    <article className="card" data-cy="cardsContainer">
      <Link to={`/phones/${product.itemId}`} className="link">
        <div className="card__image">
          <img src={product.image} alt="" />
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
      <ProductActions product={product} />
      <Characteristics details={product} items={cardCharacteeristics} />
    </article>

  );
};
