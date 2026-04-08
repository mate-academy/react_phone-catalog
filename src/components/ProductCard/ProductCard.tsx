import './ProductCard.scss';
import Product from '../../types/product';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <div className="product__container">
        <div
          className="product__image"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>

        <h3 className="product__title">{product.name}</h3>

        <div className="product__prices">
          <p className="product__price">${product.price}</p>
          {product.discount ? (
            <p className="product__price-discount">${product.fullPrice}</p>
          ) : null}
        </div>

        <div className="product__line"></div>

        <div className="product__description">
          <div className="product__description-text">
            <div className="product__property-name">Screen</div>
            <div className="product__property-value">{product.screen}</div>
          </div>
          <div className="product__description-text">
            <div className="product__property-name">Capacity</div>
            <div className="product__property-value">{product.capacity}</div>
          </div>
          <div className="product__description-text">
            <div className="product__property-name">RAM</div>
            <div className="product__property-value">{product.ram}</div>
          </div>
        </div>

        <div className="product__buttons">
          <div className="product__add-to-card">
            <a className="product__add-to-card-text" href="">
              Add to card
            </a>
          </div>
          <div className="product__add-to-favorite">
            <a className="product__add-to-favorite-link" href=""></a>
          </div>
        </div>
      </div>
    </div>
  );
};
