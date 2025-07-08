/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { ProductMainInfoProps } from '../../../types/TProductCard';
import '../ProductCard/ProductCard.scss';
import { StyledButton } from '../ProductCard/vars';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { useProducts } from '../../../context/ProductsContext';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductInfo.scss';

export const ProductInfo: React.FC<ProductMainInfoProps> = ({ showFullPrice }) => {
  const { category, itemId } = useParams<{ category: string; itemId: string }>();
  const { products } = useProducts();
  const navigate = useNavigate();
  const widthButton = '300px';

  const product = products.find(product => product.id === itemId && product.category === category);

  const findProductByIdColor = (newColor: string) => {
    return products.find(
      p =>
        p.capacity === product?.capacity &&
        p.color === newColor &&
        p.namespaceId === product?.namespaceId,
    )?.id;
  };

  const findProductByIdCapacity = (newCapacity: string) => {
    return products.find(
      p =>
        p.color === product?.color &&
        p.capacity === newCapacity &&
        p.namespaceId === product?.namespaceId,
    )?.id;
  };

  const handleColorChange = (newColor: string) => {
    const newProductId = findProductByIdColor(newColor);

    if (newProductId) {
      navigate(`/${category}/${newProductId}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    const newProductId = findProductByIdCapacity(newCapacity);

    if (newProductId) {
      navigate(`/${category}/${newProductId}`);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.map((image: string) => ({
          original: `/${image}`,
          thumbnail: `/${image}`,
        }))
      : [];

  const renderSortedList = (
    current: string,
    available: string[],
    itemClass: string,
    styleFn: (item: string, isActive: boolean) => React.CSSProperties,
    renderLabel?: (item: string) => React.ReactNode,
  ) => {
    const sorted = [current, ...available.filter(item => item !== current)];

    return sorted.map(item => (
      <li key={item} className={itemClass}>
        <button
          onClick={() => {
            if (itemClass.includes('product-colors__item')) {
              handleColorChange(item);
            } else if (itemClass.includes('product-info__capacity')) {
              handleCapacityChange(item);
            }
          }}
          className={item === current ? 'active' : ''}
          style={styleFn(item, item === current)}
        >
          {renderLabel ? renderLabel(item) : item}
        </button>
      </li>
    ));
  };

  const techSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    {
      label: 'Cell',
      value: Array.isArray(product.cell) ? product.cell.slice(0, 3).join(', ') : '',
    },
  ];

  return (
    <section className="product-info">
      <article className="product-info__head">
        <h2 className="product-info__name">{product.name}</h2>
      </article>
      <article className="product-info__body">
        <div className="product-info__top">
          <div className="product-info__gallery">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={false}
              showBullets={false}
              showThumbnails={true}
              thumbnailPosition="bottom"
              slideOnThumbnailOver={true}
              useBrowserFullscreen={true}
              autoPlay={false}
              disableSwipe={false}
            />
          </div>

          <div className="product-info__details">
            <section className="product-info__section">
              <div
                className="product_block"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <h5 className="product-colors__label">Available colors</h5>
                <h5 className="product-colors__id">ID: {product.namespaceId}</h5>
              </div>

              <div className="product-info__colors">
                <ul className="product-colors__list">
                  {product.color &&
                    product.colorsAvailable &&
                    renderSortedList(
                      product.color,
                      product.colorsAvailable,
                      'product-colors__item',
                      (color, isActive) => ({
                        backgroundColor: color,
                        height: '30px',
                        width: '30px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        border: 'none',
                        outlineOffset: '3px',
                        outline: isActive ? '1px solid #000' : '1px solid #E2E6E9',
                      }),
                      () => null,
                    )}
                </ul>
              </div>

              <hr />

              <div className="product-info__memory">
                <h5 className="product-info__label">Available memory</h5>
                <ul
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    padding: 0,
                    marginBottom: '30px',
                  }}
                >
                  {product.capacity &&
                    product.capacityAvailable &&
                    renderSortedList(
                      product.capacity,
                      product.capacityAvailable,
                      'product-info__capacity',
                      (_capacity, isActive) => ({
                        backgroundColor: isActive ? '#313237' : '#fff',
                        color: isActive ? '#fff' : '#000',
                        cursor: 'pointer',
                        padding: '6px 14px',
                        border: '1px solid #ccc',
                      }),
                    )}
                </ul>
              </div>

              <hr />

              <div className="product-card__prices">
                <h3 className="product-card__price">${product.priceDiscount}</h3>
                {showFullPrice && (
                  <h3 className="product-card__fullprice">${product.priceRegular}</h3>
                )}
              </div>

              <div className="product-card__buttons">
                <StyledButton className="product-card__add-to-cart" width={widthButton}>
                  Add to cart
                </StyledButton>
                <button className="product-card__wishlist">
                  <img src="./img/icons/Favourites.png" alt="Add to wishlist" />
                </button>
              </div>

              <div className="products-card__specs">
                <h5 className="products-card__spec">
                  Screen <span className="products-card__options">{product.screen}</span>
                </h5>
                <h5 className="products-card__spec">
                  Resolution <span className="products-card__options">{product.resolution}</span>
                </h5>
                <h5 className="products-card__spec">
                  Processor <span className="products-card__options">{product.processor}</span>
                </h5>
                <h5 className="products-card__spec">
                  RAM <span className="products-card__options">{product.ram}</span>
                </h5>
              </div>
            </section>
          </div>
        </div>

        <div className="product-info__bottom">
          <section>
            <h3 className="product-info__title">About</h3>
            <hr />
            <div className="product-info__description">
              {product.description.map((desc, index) => (
                <div key={index} className="product-info__description-item">
                  <h4 className="product-info__description-title">{desc.title}</h4>
                  <ul className="product-info__description-text">
                    {desc.text.map((text, idx) => (
                      <li key={idx}>{text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="product-info__title">Tech specs</h3>
            <hr />
            <div className="product-info__specs">
              {techSpecs.map(({ label, value }) => (
                <div key={label} className="product-info__spec-row">
                  <span className="product-info__spec-name">{label}</span>
                  <span className="product-info__spec-value">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </section>
  );
};
