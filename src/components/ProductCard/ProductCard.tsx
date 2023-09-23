import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { FeatureList } from '../FeatureList';
import { ProductActions } from '../ProductActions';
import {
  generateSlugForProduct,
  getPriceAfterDiscount,
} from '../../helpers/utils';

import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    price,
    discount,
    id,
    type,
    screen,
    capacity,
    ram,
  } = product;

  const slug = generateSlugForProduct({ type, id });
  const priceAfterDiscount = getPriceAfterDiscount(price, discount);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="ProductCard">
      <div className="ProductCard__img-container">
        <Link to={slug} onClick={handleClick}>
          <img
            src={imageUrl}
            alt={name}
            className="ProductCard__img"
          />
        </Link>
      </div>

      <Link to={slug} className="ProductCard__name">
        {name}
      </Link>

      <div className="ProductCard__price">
        {String.fromCodePoint(0x00024)}
        {priceAfterDiscount}
        {discount !== 0 && (
          <div className="ProductCard__initial-price">
            {String.fromCodePoint(0x00024)}
            {price}
          </div>
        )}
      </div>

      <div className="ProductCard__features">
        <FeatureList {...{
          screen,
          capacity,
          ram,
        }}
        />
      </div>

      <div className="ProductCard__actions">
        <ProductActions product={product} />
      </div>
    </div>
  );
};
