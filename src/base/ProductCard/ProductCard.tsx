import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';
import { Price } from '../Price/Price';
import { Line } from '../Line/Line';
import { SpecsMini } from '../SpecsMini/SpecsMini';
import { CardButtons } from '../CardButton/CardButton';

type Props = {
  product: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showDiscount }) => {
  return (
    <div className="card">
      <Link to={`/${product.categoryId}/${product.id}`} className="card__link">
        <figure className="card__image-wrapper">
          <img
            src={
              product.images && product.images.length > 0
                ? `/${product.images[0]}`
                : '/img/product-not-found.png'
            }
            className="card__image"
            alt={product.name}
          />
        </figure>
        <div className="card__product-name">{product.name}</div>
      </Link>
      <Price product={product} showDiscount={showDiscount} />
      <Line />
      <SpecsMini product={product} />
      <CardButtons product={product} />
    </div>
  );
};
