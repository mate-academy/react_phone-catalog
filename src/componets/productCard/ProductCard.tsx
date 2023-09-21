import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CDN_URL } from '../../http/api';
import { ENDPOINT_GET_PRODUCT_IMAGES } from '../../http/endpoints';
import { ProductCardActions } from '../productCardActions/ProductCardActions';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/phones/${product.phoneId}`, { state: { product } });
  };

  const renderCharacteristics = (
    name: string, value: string, isLast = false,
  ) => (
    <div
      className={`product-card__characteristics ${isLast ? 'product-card__characteristics--last' : ''}`}
    >
      <span className="product-card__characteristics-name">{name}</span>
      <span className="product-card__characteristics-value">{value}</span>
    </div>
  );

  if (!product) {
    return null;
  }

  return (
    <div className="product-card">
      <div className="product-card__container">
        <div
          className="product-card__image-container"
          onClick={handleImageClick}
          aria-hidden="true"
        >
          <img
            src={`${CDN_URL}/${ENDPOINT_GET_PRODUCT_IMAGES}${product.image}`}
            alt={product.name}
            className="product-card__image"
          />
        </div>
        <p className="product-card__title">{product.name}</p>
        <div className="product-card__price-container">
          <h2 className="product-card__price">{`$${product.price}`}</h2>
          <h2 className="product-card__price-without-discount">{`$${product.fullPrice}`}</h2>
        </div>
        <div className="product-card__line" />
        {renderCharacteristics('Screen', product.screen)}
        {renderCharacteristics('Capacity', product.capacity)}
        {renderCharacteristics('RAM', product.ram, true)}
        <ProductCardActions product={product} />
      </div>
    </div>
  );
};
