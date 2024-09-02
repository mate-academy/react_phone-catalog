import { Link } from 'react-router-dom';
import { ProductType } from '../../types/ProductType';
import { AddToCart } from '../AddToCart';
import { AddToFav } from '../AddToFav';
import { ProductTypeExtended } from '../../types/ProductTypeExtended';
import { ImagesSlider } from '../ImagesSlider';

type Props = {
  className?: string;
  product: ProductType | ProductTypeExtended | undefined;
  showDiscount?: boolean;
};

export const ProductContent: React.FC<Props> = ({
  className = '',
  product,
  showDiscount = true,
}) => {
  const isProductType = (
    prod: ProductType | ProductTypeExtended | undefined,
  ): prod is ProductType => {
    return !!prod && (prod as ProductType).price !== undefined;
  };

  const isProductTypeExtended = (
    prod: ProductType | ProductTypeExtended | undefined,
  ): prod is ProductTypeExtended => {
    return !!prod && (prod as ProductTypeExtended).priceRegular !== undefined;
  };

  const getColorLink = (value: string) => {
    if (isProductTypeExtended(product)) {
      return `/${product?.category}/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${value.replaceAll(' ', '-')}`;
    }

    return '';
  };

  const getCapacityLink = (value: string) => {
    if (isProductTypeExtended(product)) {
      return `/${product?.category}/${product?.namespaceId}-${value.toLowerCase()}-${product?.color}`;
    }

    return '';
  };

  return (
    <div className={`product-content ${className}`.trim()}>
      {!className.includes('product-content--details') ? (
        <>
          {isProductType(product) && (
            <>
              <Link
                className="product-content__img-link"
                to={`/${product.category}/${product.itemId}`}
              >
                <img
                  className="product-content__img"
                  src={product.image}
                  alt={product.name}
                />
              </Link>

              <Link
                className="product-content__title"
                to={`/${product.category}/${product.itemId}`}
              >
                {product.name}
              </Link>

              <div className="product-content__prices">
                <span className="product-content__price">{`$${product.price}`}</span>
                {showDiscount && (
                  <span className="product-content__price product-content__price--full">{`$${product.fullPrice}`}</span>
                )}
              </div>

              <ul className="product-content__specs">
                <li className="product-content__specs-item">
                  Screen
                  <span className="product-content__specs-value">
                    {product.screen}
                  </span>
                </li>
                <li className="product-content__specs-item">
                  Capacity
                  <span className="product-content__specs-value">
                    {product.capacity}
                  </span>
                </li>
                <li className="product-content__specs-item">
                  RAM
                  <span className="product-content__specs-value">
                    {product.ram}
                  </span>
                </li>
              </ul>

              <div className="product-content__buttons">
                <AddToCart
                  className="product-content__add-to-cart"
                  product={product}
                />
                <AddToFav
                  className="product-content__add-to-fav"
                  product={product}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {isProductTypeExtended(product) && (
            <>
              <h2 className="product-content__title section-title">
                {product.name}
              </h2>

              <ImagesSlider
                className="product-content__images-slider"
                images={product.images}
              />

              <div className="product-content__info">
                <div className="product-content__block">
                  <span className="product-content__block-title">
                    Available colors
                  </span>
                  <span className="product-content__block-id">ID: 802390</span>

                  <ul className="product-content__block-list">
                    {product.colorsAvailable.map(color => (
                      <li className="product-content__block-item" key={color}>
                        <Link
                          className={`product-content__color-btn product-content__color-btn--${color} ${product.color === color ? 'product-content__color-btn--active' : ''}`}
                          to={getColorLink(color)}
                        ></Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-content__block">
                  <span className="product-content__block-title">
                    Select capacity
                  </span>

                  <ul className="product-content__block-list">
                    {product.capacityAvailable.map(capacity => (
                      <li
                        className="product-content__block-item"
                        key={capacity}
                      >
                        <Link
                          className={`product-content__capacity-btn ${product.capacity === capacity ? 'product-content__capacity-btn--active' : ''}`}
                          type="button"
                          to={getCapacityLink(capacity)}
                        >
                          {capacity}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-content__prices">
                  <span className="product-content__price">{`$${product.priceRegular}`}</span>
                  {showDiscount && (
                    <span className="product-content__price product-content__price--full">{`$${product.priceDiscount}`}</span>
                  )}
                </div>

                <div className="product-content__buttons">
                  <AddToCart
                    className="product-content__add-to-cart"
                    product={product}
                  />
                  <AddToFav
                    className="product-content__add-to-fav"
                    product={product}
                  />
                </div>

                <ul className="product-content__specs">
                  <li className="product-content__specs-item">
                    Screen
                    <span className="product-content__specs-value">
                      {product.screen.replace(/\(.*\)/, '').trim()}
                    </span>
                  </li>
                  <li className="product-content__specs-item">
                    Resolution
                    <span className="product-content__specs-value">
                      {product.resolution}
                    </span>
                  </li>
                  <li className="product-content__specs-item">
                    Processor
                    <span className="product-content__specs-value">
                      {product.processor}
                    </span>
                  </li>
                  <li className="product-content__specs-item">
                    RAM
                    <span className="product-content__specs-value">
                      {product.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
