import { Link } from 'react-router-dom';
import { ProductActionButtons } from '../ProductActionButtons';
import { FeaturesList } from '../FeaturesList';
import { generateSlugForProduct } from '../../helpers/utils';
import './ProductCard.scss';

export const ProductCard:React.FC<Product> = (props) => {
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
  } = props;
  const priceAfterDiscount = price * ((100 - discount) / 100);
  const slug = generateSlugForProduct({ type, id });

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <Link
          type="button"
          to={slug}
        >
          <img
            className="product-card__image"
            src={imageUrl}
            alt={name}
          />
        </Link>
      </div>
      <Link
        type="button"
        to={slug}
        className="product-card__name"
      >
        {name}
      </Link>
      <div className="product-card__price">
        {String.fromCodePoint(0x00024)}
        {priceAfterDiscount}
        {(discount !== 0) && (
          <div className="product-card__initial-price">
            {String.fromCodePoint(0x00024)}
            {price}
          </div>
        )}
      </div>
      <div className="product-card__features">
        <FeaturesList {...{
          screen,
          capacity,
          ram,
        }}
        />
      </div>
      <div className="product-card__actions">
        <ProductActionButtons {...props} />
      </div>
    </div>
  );
};
