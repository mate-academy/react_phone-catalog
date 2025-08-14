import React from 'react';
import './ProductCard.scss';
import { Product } from '../../utils/Product';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const getImageSrc = (src: string) => (src.startsWith('/') ? src : '/' + src);

  const navigate = useNavigate();

  return (
    <div className="product" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product__characteristics">
        {product.image ? (
          <img
            className="product__image"
            src={getImageSrc(product.image)}
            alt="product image"
          />
        ) : product.images && product.images.length > 0 ? (
          <img
            className="product__image"
            src={getImageSrc(product.images[0])}
            alt="product image"
          />
        ) : (
          <div>No image available</div>
        )}

        <p className="product__description">{product.name}</p>
        {product.fullPrice ? (
          <p className="product__price">${product.fullPrice}</p>
        ) : (
          <div className="product__price-with-discount">
            <p className="product__price product__price--discount">
              ${product.priceDiscount}
            </p>
            <p className="product__price product__price--regular">
              ${product.priceRegular}
            </p>
          </div>
        )}
      </div>

      <div className="product__details">
        <div className="product__details-row">
          <div className="product__details-name">Screen</div>
          <div className="product__details-value">{product.screen}</div>
        </div>
        <div className="product__details-row">
          <div className="product__details-name">Capacity</div>
          <div className="product__details-value">{product.capacity}</div>
        </div>
        <div className="product__details-row">
          <div className="product__details-name">RAM</div>
          <div className="product__details-value">{product.ram}</div>
        </div>
      </div>

      <div className="product__button">
        <button className="product__button--add">Add to cart</button>
        <button className="product__button--favourite">
          <img
            src="/img/icons/icon-favourites.svg"
            alt="favourites icon"
            className="product__button-icon"
          />
        </button>
      </div>
    </div>
  );
};
