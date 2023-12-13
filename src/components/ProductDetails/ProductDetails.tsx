/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import cn from 'classnames';
import { ProductDetails as Details } from '../../types/ProductDetails';

interface Props {
  product: Details | null;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [activeImg, setActiveImg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setActiveImg(product.images[0]);
    }
  }, [product]);

  const getColor = (color: string) => {
    switch (color) {
      case 'black':
        return '#313237';
      case 'purple':
        return '#d2cddb';
      case 'green':
        return '#aee2cc';
      case 'spacegray':
        return '#4c4c4c';
      case 'midnightgreen':
        return '#5f7170';
      case 'red':
        return '#c31934';
      case 'coral':
      case 'rosegold':
        return '#f9604c';
      case 'gold':
      case 'yellow':
        return '#fcdbc1';
      default:
        return '#f0f0f0';
    }
  };

  return (
    <section className="section product-details">
      <div className="section__container">
        <div className="product-details__block">
          <button
            type="button"
            className="product-details__back"
            data-cy="backButton"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <h1 className="h1 product-details__title">{product?.name}</h1>

          <div className="product-details__wrapper">
            <div className="product-details__items">
              {product?.images.map((image) => (
                <div
                  className={cn('product-details__item', {
                    'product-details__item--active': image === activeImg,
                  })}
                  onMouseDown={() => setActiveImg(image)}
                  key={image}
                >
                  <picture>
                    <img src={image} alt={image} loading="lazy" />
                  </picture>
                </div>
              ))}
            </div>

            <div className="product-details__imgs">
              <picture>
                <img
                  className="product-details__img"
                  src={activeImg}
                  alt={product?.name}
                  loading="lazy"
                />
              </picture>
            </div>

            <div className="product-details__info">
              <div className="product-details__subwrapper">
                <div className="product-details__label">Available colors</div>

                <div className="product-details__colors">
                  {product?.colorsAvailable.map((color) => {
                    const backgroundColor = getColor(color);

                    return (
                      <Link
                        to={`/phones/${
                          product.namespaceId
                        }-${product.capacity.toLowerCase()}-${color}`}
                        className={cn('product-details__color', {
                          'product-details__color--active':
                            color === product.color,
                        })}
                        key={color}
                      >
                        <span style={{ backgroundColor }} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="product-details__subwrapper">
                <div className="product-details__label">Select capacity</div>

                <div className="product-details__capacities">
                  {product?.capacityAvailable.map((capacity) => (
                    <Link
                      to={`/phones/${
                        product.namespaceId
                      }-${capacity.toLowerCase()}-${product.color}`}
                      className={cn('product-details__capacity', {
                        'product-details__capacity--active':
                          capacity === product.capacity,
                      })}
                      key={capacity}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-details__prices">
                <div className="h1 product-details__price">
                  {product?.priceDiscount}
                </div>
                <div className="product-details__price product-details__price--old">
                  {product?.priceRegular}
                </div>
              </div>

              <div className="product-details__btns">
                <button type="button" className="btn">
                  Add to cart
                </button>
                <button type="button" className="like-btn">
                  <img
                    className="like-btn__icon"
                    src="./img/like.svg"
                    alt="like-btn"
                    loading="lazy"
                  />
                </button>
              </div>

              <div className="product-details__cont">
                <div className="product-details__line">
                  <div className="product-details__label">Screen</div>
                  <div className="product-details__value">
                    {product?.screen}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Resolution</div>
                  <div className="product-details__value">
                    {product?.resolution}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Processor</div>
                  <div className="product-details__value">
                    {product?.processor}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">RAM</div>
                  <div className="product-details__value">{product?.ram}</div>
                </div>
              </div>
            </div>

            <div className="product-details__id">ID: 802390</div>
          </div>

          <div className="product-details__content">
            <div className="product-details__about">
              <h2 className="h2 product-details__subtitle">About</h2>

              <div
                className="product-details__descriptions"
                data-cy="productDescription"
              >
                {product?.description.map((description) => (
                  <div
                    className="product-details__description text"
                    key={description.title}
                  >
                    <h3>{description.title}</h3>
                    <p>{description.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details__specs">
              <h2 className="h2 product-details__subtitle">Tech specs</h2>

              <div className="product-details__cont">
                <div className="product-details__line">
                  <div className="product-details__label">Screen</div>
                  <div className="product-details__value">
                    {product?.screen}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Resolution</div>
                  <div className="product-details__value">
                    {product?.resolution}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Processor</div>
                  <div className="product-details__value">
                    {product?.processor}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">RAM</div>
                  <div className="product-details__value">{product?.ram}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Camera</div>
                  <div className="product-details__value">
                    {product?.camera}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Zoom</div>
                  <div className="product-details__value">{product?.zoom}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Cell</div>
                  <div className="product-details__value">
                    {product?.cell.map((cellItem, index) => (
                      <span key={cellItem}>
                        {index === product?.cell.length - 1
                          ? cellItem
                          : `${cellItem}, `}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
