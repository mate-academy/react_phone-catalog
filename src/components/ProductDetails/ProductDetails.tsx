import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './ProductDetails.scss';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  if (!productId) {
    throw new Error('Error: no product found with this id');
  }

  const { products } = useProducts();

  const {
    getProductById,
    addToCart,
    removeFromCart,
    toggleFavorite,
    isFavorite,
    isInCart,
  } = useProducts();
  const product = getProductById(productId);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [sliderOne, setSliderOne] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(products);
  const isFav = isFavorite(productId);
  const inCart = isInCart(productId);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    setVisibleProducts(products);
  }, [products]);

  const newestProducts = useMemo(() => {
    return [...visibleProducts].sort((a, b) => b.year - a.year);
  }, [visibleProducts]);

  return (
    <>
      {product && (
        <div className="product-details">
          <div className="product-details__wrapper">
            <div className="elements__wrapper">
              <Link to="/" className="icon icon--home"></Link>
              <div className="icon icon--right"></div>
              <Link
                to={`/${product.category}`}
                className="elements__nav-text small-text"
              >
                {product.category}
              </Link>
              <div className="icon icon--right"></div>
              <div className="elements__nav-text small-text">
                {product.name}
              </div>
            </div>
            <h2 className="product-details__title">{product.name}</h2>
            <ul className="product-details__images">
              {product.images.map(i => (
                <button
                  className={classNames(
                    'product-details__image image-button',
                    activeImage === i && 'image-button--active',
                  )}
                  key={i}
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={i}
                    alt="product image"
                    className="product-details__img"
                  />
                </button>
              ))}
            </ul>

            <div className="product-details__main-image">
              {activeImage && (
                <img
                  src={activeImage}
                  alt="product"
                  className="product-details__main-img "
                />
              )}
            </div>

            <div className="product-details__blank"></div>

            <div className="product-details__characteristics">
              <div className="product-details__colors-text small-text">
                Available colors
              </div>
              <ul className="product-details__colors">
                {product.colorsAvailable.map(c => (
                  <Link
                    to={`/${product.category}/${product.namespaceId}-${product.capacity.toLocaleLowerCase()}-${c}`}
                    key={c}
                  >
                    <div className="color-button">
                      <div
                        className="color-button-content"
                        style={{ backgroundColor: c }}
                      ></div>
                    </div>
                  </Link>
                ))}
              </ul>
              <div className="product-details__line"></div>
              <div className="product-details__capacity-title small-text">
                Select capacity
              </div>
              <ul className="product-details__capacity">
                {product.capacityAvailable.map(c => (
                  <Link
                    to={`/${product.category}/${product.namespaceId}-${c.toLocaleLowerCase()}-${product.color}`}
                    key={c}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className={classNames(
                        `
                      product-details__capacity-button
                      `,
                        c === product.capacity ? 'primary-button' : 'button',
                      )}
                    >
                      {c}
                    </div>
                  </Link>
                ))}
              </ul>
              <div className="product-details__line"></div>
              <div className="product-details__price"></div>
              <div className="product-details-price-wrapper">
                <h2 className="product-details-price">
                  ${product.priceRegular}
                </h2>
                <h2 className="product-details-price discounted">
                  ${product.priceDiscount}
                </h2>
              </div>
              <div className="product-details__buttons">
                <button
                  className={classNames(
                    'product-details__button',
                    inCart ? 'button' : 'primary-button',
                  )}
                  onClick={() => {
                    if (inCart) {
                      removeFromCart(product.id);
                    } else {
                      addToCart(product);
                    }
                  }}
                >
                  {inCart ? 'Added' : 'Add to cart'}
                </button>

                <button
                  className={classNames(
                    'product-details__favourite button',
                    isFav && 'button--active',
                  )}
                  onClick={() => {
                    if (product) {
                      toggleFavorite(product);
                    }
                  }}
                >
                  <div
                    className={classNames(
                      'icon',
                      isFav ? 'icon--favourite-filled' : 'icon--favourite',
                    )}
                  ></div>
                </button>
              </div>

              <ul className="product-details__description">
                <li className="product-details__item">
                  <div className="product-details__param small-text">
                    Screen
                  </div>
                  <div className="product-details__value">{product.screen}</div>
                </li>
                <li className="product-details__item">
                  <div className="product-details__param small-text">
                    Resolution
                  </div>
                  <div className="product-details__value">
                    {product.resolution}
                  </div>
                </li>
                <li className="product-details__item">
                  <div className="product-details__param small-text">
                    Processor
                  </div>
                  <div className="product-details__value">
                    {product.processor}
                  </div>
                </li>
                <li className="product-details__item">
                  <div className="product-details__param small-text">Ram</div>
                  <div className="product-details__value">{product.ram}</div>
                </li>
              </ul>
            </div>
            <div className="product-details__id small-text">
              ID: {product.id}
            </div>
            <div className="product-details__about">
              <h3 className="product-details__about-title">About</h3>
              <div className="product-details__line-des"></div>
              {product.description.map(d => (
                <div className="product-details__block" key={d.title}>
                  <h4 className="product-details__block-title">{d.title}</h4>
                  <div className="product-details__block-text body-text">
                    {d.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="product-details__blank"></div>
            <div className="product-details__specs">
              <h3 className="product-details__specs-title">Tech specs</h3>
              <div className="product-details__line-des"></div>
              <ul className="product-details__block-description">
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Screen
                  </div>
                  <div className="product-details__block-value">
                    {product.screen}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Resolution
                  </div>
                  <div className="product-details__block-value">
                    {product.resolution}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Processor
                  </div>
                  <div className="product-details__block-value">
                    {product.processor}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Ram
                  </div>
                  <div className="product-details__block-value">
                    {product.ram}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Built in memory
                  </div>
                  <div className="product-details__block-value">
                    {product.capacity}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Camera
                  </div>
                  <div className="product-details__block-value">
                    {product.camera}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Zoom
                  </div>
                  <div className="product-details__block-value">
                    {product.zoom}
                  </div>
                </li>
                <li className="product-details__block-item">
                  <div className="product-details__block-param body-text">
                    Cell
                  </div>
                  <div className="product-details__block-value">
                    {product.cell}
                  </div>
                </li>
              </ul>
            </div>

            <section className="slider">
              <h2 className="slider__title slider__pc">You may also like</h2>
              <button
                className="slider__button button slider__pc"
                onClick={() => sliderOne > 0 && setSliderOne(s => s - 1)}
              >
                <div className="icon icon--left"></div>
              </button>
              <button
                className="slider__button button slider__pc"
                disabled={sliderOne >= newestProducts.length - 4}
                onClick={() => setSliderOne(s => s + 1)}
              >
                <div className="icon icon--right"></div>
              </button>

              <div className="slider__mobile">
                <h2 className="slider__title">You may also like</h2>
                <button
                  className="slider__button button"
                  onClick={() => sliderOne > 0 && setSliderOne(s => s - 1)}
                >
                  <div className="icon icon--left"></div>
                </button>
                <button
                  className="slider__button button"
                  disabled={sliderOne >= newestProducts.length - 4}
                  onClick={() => setSliderOne(s => s + 1)}
                >
                  <div className="icon icon--right"></div>
                </button>
              </div>

              <div className="slider__wrapper-wrap">
                <div
                  className="slider__wrapper"
                  style={{
                    transform: `translateX(calc(-${sliderOne} * var(--card-width) - ${sliderOne} * var(--gap)))`,
                  }}
                >
                  {newestProducts.map(p => (
                    <ProductCard key={p.id} product={p} discounted={true} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
