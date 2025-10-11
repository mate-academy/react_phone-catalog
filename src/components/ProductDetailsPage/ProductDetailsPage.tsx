/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api';
import { ProductDetails } from '../../types/ProductsDetails';
import { CategoryType } from '../../types/Category';
import styles from './ProductDetails.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css';
import { ProductSlider } from '../ProductSlider';
import { useFavorites } from '../../context/Favoutires';
import { useCart } from '../../context/Cart';
import { SkeletonDetailsPage } from '../SkeletonDetailsPage';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError('');

    getProductById(category as CategoryType)
      .then(products => {
        const productDetail = products.find(
          (item: ProductDetails) => item.id === productId,
        );

        setProduct(productDetail);
      })
      .catch(() => setIsError('Product was not found'))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(product?.id || '');

  const { addToCart, removeFromCart, isInCart } = useCart();
  const selectedProduct = isInCart(product?.id || '');

  const numCapacity = product?.capacity.match(/\d+/);
  const strCapacity = product?.capacity.replace(/\d+/, '');
  const numRam = product?.ram.match(/\d+/);
  const strRam = product?.ram.replace(/\d+/, '');

  const colorMap: Record<string, string> = {
    midnight: '#191970',
    graphite: '#383838',
    spacegray: '#4B4B4B',
    midnightgreen: '#004953',
    rosegold: '#B76E79',
    spaceblack: '#161617',
    sierrablue: '#7393B3',
    'space gray': '#4B4B4B',
    'rose gold': '#B76E79',
    'sky blue': '#87CEEB',
  };

  return (
    <section className={styles['product-details']}>
      <div className="container">
        <Breadcrumbs category={category} product={product} />
        <button
          className={styles['product-details__back-btn']}
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${category}`);
            }
          }}
        >
          Back
        </button>
        {isLoading && <SkeletonDetailsPage />}
        {!isLoading && isError && (
          <div className={styles['product-details__img-box']}>
            <img
              className={styles['product-details__img']}
              src="./img/product-not-found.png"
              alt="Product not found"
            />
          </div>
        )}
        {!isLoading && !isError && !product && (
          <div className={styles['product-details__img-box']}>
            <img
              className={styles['product-details__img']}
              src="./img/product-not-found.png"
              alt="Product not found"
            />
          </div>
        )}
        {!isLoading && !isError && product && (
          <div className={styles['product-details__content']}>
            <h2 className="title">{product.name}</h2>
            <div className={styles['product-details__box']}>
              <div className={styles['product-details__slider-wrapper']}>
                <Swiper
                  slidesPerView={1}
                  modules={[Pagination]}
                  breakpoints={{
                    640: {
                      direction: 'vertical',
                      pagination: {
                        clickable: true,
                        el: '#product-details-slider-pagination',
                        bulletClass: styles.bullet,
                        bulletActiveClass: styles.activeBullet,
                        renderBullet: (index, className) => `
          <span class="${className}">
            <img src="./${product.images[index]}" alt="thumb" />
          </span>
        `,
                      },
                    },
                    0: {
                      direction: 'horizontal',
                      pagination: {
                        clickable: true,
                        el: '#product-details-slider-pagination',
                        bulletClass: styles.bullet,
                        bulletActiveClass: styles.activeBullet,
                        renderBullet: (index, className) => `
          <span class="${className}">
            <img src="./${product.images[index]}" alt="thumb" />
          </span>
        `,
                      },
                    },
                  }}
                >
                  {product.images.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className={styles['product-details__slider-img']}
                        src={`./${slide}`}
                        alt="Photo of product"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div
                  id="product-details-slider-pagination"
                  className={styles.pagination}
                ></div>
              </div>
              <div className={styles['product-details__characteristics']}>
                <div className={styles['product-details__characteristics-box']}>
                  <div
                    className={
                      styles['product-details__characteristics-content']
                    }
                  >
                    <div className="product-details__color-box">
                      <div
                        className={
                          styles['product-details__characteristics-title']
                        }
                      >
                        Available colors
                      </div>
                      <div
                        className={
                          styles['product-details__characteristics-color']
                        }
                      >
                        {product.colorsAvailable.map((color, index) => {
                          const newId = `${product.id.split('-').slice(0, -1).join('-')}-${color.toLowerCase()}`;

                          return (
                            <NavLink
                              key={index}
                              to={`/${category}/${newId}`}
                              className={({
                                isActive,
                              }) => `${styles['product-details__characteristics-color-link']}
                                ${isActive ? styles['product-details__characteristics-color-link--active'] : ''}`}
                              style={{
                                backgroundColor: colorMap[color] || color,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <p className={styles['product-details__id']}>
                      ID: {product.id}
                    </p>
                  </div>
                </div>
                <div
                  className={styles['product-details__characteristics-divider']}
                ></div>
                <div className={styles['product-details__characteristics-box']}>
                  <div
                    className={styles['product-details__characteristics-title']}
                  >
                    Select capacity
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-capacity']
                    }
                  >
                    {product.capacityAvailable.map((capacity, index) => {
                      const numberCapacity = capacity.match(/\d+/);
                      const stringCapacity = capacity.replace(/\d+/, '');

                      const parts = product.id.split('-');

                      parts[parts.length - 2] = capacity.toLowerCase();

                      const newId = parts.join('-');

                      return (
                        <NavLink
                          key={index}
                          to={`/${category}/${newId}`}
                          className={({ isActive }) =>
                            `${styles['product-details__characteristics-capacity-link']}
           ${isActive ? styles['product-details__characteristics-capacity-link--active'] : ''}`
                          }
                        >
                          {`${numberCapacity} ${stringCapacity}`}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={styles['product-details__characteristics-divider']}
                ></div>
                <div
                  className={styles['product-details__characteristics-price']}
                >
                  <div
                    className={
                      styles['product-details__characteristics-new-price']
                    }
                  >
                    ${product.priceDiscount}
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-old-price']
                    }
                  >
                    ${product.priceRegular}
                  </div>
                </div>
                <div
                  className={
                    styles['product-details__characteristics-link-box']
                  }
                >
                  <button
                    className={`${styles['product-details__characteristics-link']} ${selectedProduct ? styles['product-details__characteristics-link--selected'] : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      if (selectedProduct) {
                        removeFromCart(product.id);
                      } else {
                        addToCart(product);
                      }
                    }}
                  >
                    {selectedProduct ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    className={`${styles['product-details__characteristics-link-favourite']} ${favorite ? styles['product-details__characteristics-link-favourite--selected'] : ''}`}
                    onClick={e => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  ></button>
                </div>
                <div
                  className={styles['product-details__characteristics-descr']}
                >
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      Screen
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.screen}
                    </div>
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      Resolution
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.resolution}
                    </div>
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      Processor
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.processor}
                    </div>
                  </div>
                  <div
                    className={
                      styles['product-details__characteristics-descr-box']
                    }
                  >
                    <div
                      className={
                        styles['product-details__characteristics-descr-title']
                      }
                    >
                      RAM
                    </div>
                    <div
                      className={
                        styles['product-details__characteristics-descr-text']
                      }
                    >
                      {product.ram}
                    </div>
                  </div>
                </div>
              </div>
              <p className={styles['product-details__identifier']}>
                ID: {product.id}
              </p>
            </div>
            <div className={styles['product-details__description']}>
              <div className={styles['product-details__about']}>
                <h3 className={styles['product-details__description-title']}>
                  About
                </h3>
                <div
                  className={styles['product-details__description-divider']}
                ></div>
                {product.description.map((item, index) => (
                  <div
                    className={styles['product-details__about-box']}
                    key={index}
                  >
                    <h3 className={styles['product-details__about-title']}>
                      {item.title}
                    </h3>
                    <p className={styles['product-details__about-text']}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles['product-details__techspecs']}>
                <h3 className={styles['product-details__description-title']}>
                  Tech specs
                </h3>
                <div
                  className={styles['product-details__description-divider']}
                ></div>
                <div className={styles['product-details__techspecs-content']}>
                  <div className={styles['product-details__techspecs-box']}>
                    <div className={styles['product-details__techspecs-title']}>
                      Screen
                    </div>
                    <div className={styles['product-details__techspecs-text']}>
                      {product.screen}
                    </div>
                  </div>
                  <div className={styles['product-details__techspecs-box']}>
                    <div className={styles['product-details__techspecs-title']}>
                      Resolution
                    </div>
                    <div className={styles['product-details__techspecs-text']}>
                      {product.resolution}
                    </div>
                  </div>
                  <div className={styles['product-details__techspecs-box']}>
                    <div className={styles['product-details__techspecs-title']}>
                      Processor
                    </div>
                    <div className={styles['product-details__techspecs-text']}>
                      {product.processor}
                    </div>
                  </div>
                  <div className={styles['product-details__techspecs-box']}>
                    <div className={styles['product-details__techspecs-title']}>
                      RAM
                    </div>
                    <div className={styles['product-details__techspecs-text']}>
                      {`${numRam} ${strRam}`}
                    </div>
                  </div>
                  <div className={styles['product-details__techspecs-box']}>
                    <div className={styles['product-details__techspecs-title']}>
                      Built in memory
                    </div>
                    <div className={styles['product-details__techspecs-text']}>
                      {`${numCapacity} ${strCapacity}`}
                    </div>
                  </div>
                  {product.camera && (
                    <div className={styles['product-details__techspecs-box']}>
                      <div
                        className={styles['product-details__techspecs-title']}
                      >
                        Camera
                      </div>
                      <div
                        className={styles['product-details__techspecs-text']}
                      >
                        {product.camera}
                      </div>
                    </div>
                  )}
                  {product.zoom && (
                    <div className={styles['product-details__techspecs-box']}>
                      <div
                        className={styles['product-details__techspecs-title']}
                      >
                        Zoom
                      </div>
                      <div
                        className={styles['product-details__techspecs-text']}
                      >
                        {product.zoom}
                      </div>
                    </div>
                  )}
                  <div className={styles['product-details__techspecs-box']}>
                    <div className={styles['product-details__techspecs-title']}>
                      Cell
                    </div>
                    <div className={styles['product-details__techspecs-text']}>
                      {product.cell.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-details__similar-products">
              <h3
                className={`title ${styles['product-details__title-slider']}`}
              >
                You may also like
              </h3>
              <ProductSlider detailProduct={product} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
