/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import styles from './productDetail.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import heardBuron from './Pictures/Favourites.png';
import { ProductDetailes } from '../../services/ProductDetailType';
import { colors } from '../../services/colors';
import heardBuronActive from './Pictures/favoriteActive.png';
import {
  addFavorite,
  addToCart,
  removeFavorite,
  removeFromCart,
} from '../../feachers/detailSlice';
// eslint-disable-next-line max-len
import { ProductType } from '../../services/enums';
import Loader from '../Loader/Spiner';
import { loadProductsDetail } from '../../feachers/productSlice';

type Props = {
  title: string;
  type: ProductType;
};

export const ProductDetails: React.FC<Props> = ({ type }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [product, setProduct] = useState<ProductDetailes | null>(null);
  const [, setCurrentImageIndex] = useState(0);

  const productDetails = useAppSelector(state => state.phones?.productsDetails);
  const load = useAppSelector(state => state.phones.isLoading);
  const findProduct = useAppSelector(state => state.phones.products);
  const recommendationsProduct = useAppSelector(state => state.phones.products);
  const isCart = useAppSelector(state =>
    state.cartAndFavorits.cart.some(
      car => car.name === product?.name && car.isCart,
    ),
  );

  const isFavorite = useAppSelector(state =>
    state.cartAndFavorits.favorites.some(
      fav => fav.name === product?.name && fav.isFavorite,
    ),
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    setProduct(productDetails.find(item => item.id === productId) || null);
  }, [productId, productDetails]);

  useEffect(() => {
    dispatch(loadProductsDetail(type));
  }, [type]);

  const handlerProductColor = (
    color: string,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (product?.color === color) {
      return;
    }

    const foundProduct = productDetails.find(
      item => item.color === color && item.namespaceId === product?.namespaceId,
    );

    setProduct(foundProduct || null);
    event.stopPropagation();
  };

  const handlerSelectCapacity = (
    capacity: string,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const currentColor = product?.color;
    const foundProduct = productDetails.find(
      item =>
        item.capacity === capacity &&
        item.namespaceId === product?.namespaceId &&
        item.color === currentColor,
    );

    setProduct(foundProduct || null);
    event.stopPropagation();
  };

  const handlerAddProduct = () => {
    const foundProduct = findProduct.find(item => item.name === product?.name);

    if (isCart) {
      dispatch(removeFromCart(foundProduct));
    } else {
      if (foundProduct) {
        dispatch(addToCart(foundProduct));
      }
    }
  };

  const handlerFavoritsAdd = () => {
    const foundProduct = findProduct.find(item => item.name === product?.name);

    if (isFavorite) {
      dispatch(removeFavorite(foundProduct));
    } else {
      if (foundProduct) {
        dispatch(addFavorite(foundProduct));
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.productDetailWrapper}>
        {load ? (
          <div className={styles.loaderContainer}>{<Loader />}</div>
        ) : (
          <section className={styles.sectionProductDetail}>
            <div className={styles.homeLinkContainer}>
              <NavLink to={'/'}>
                <svg
                  className={styles.home}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M7.59087 0.80718C7.83161 0.619937 8.16872 0.619937 8.40946 0.80718L14.4095 5.47385C14.5718 5.60015 14.6668 5.79435 14.6668 6.00008V13.3334C14.6668 13.8638 14.4561 14.3726 14.081 14.7476C13.706 15.1227 13.1973 15.3334 12.6668 15.3334H3.3335C2.80306 15.3334 2.29436 15.1227 1.91928 14.7476C1.54421 14.3726 1.3335 13.8638 1.3335 13.3334V6.00008C1.3335 5.79435 1.42848 5.60015 1.59087 5.47385L7.59087 0.80718ZM2.66683 6.32614V13.3334C2.66683 13.5102 2.73707 13.6798 2.86209 13.8048C2.98712 13.9298 3.15669 14.0001 3.3335 14.0001H12.6668C12.8436 14.0001 13.0132 13.9298 13.1382 13.8048C13.2633 13.6798 13.3335 13.5102 13.3335 13.3334V6.32614L8.00016 2.17799L2.66683 6.32614Z"
                    fill="#0F0F11"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M5.3335 7.99992C5.3335 7.63173 5.63197 7.33325 6.00016 7.33325H10.0002C10.3684 7.33325 10.6668 7.63173 10.6668 7.99992V14.6666C10.6668 15.0348 10.3684 15.3333 10.0002 15.3333C9.63197 15.3333 9.3335 15.0348 9.3335 14.6666V8.66659H6.66683V14.6666C6.66683 15.0348 6.36835 15.3333 6.00016 15.3333C5.63197 15.3333 5.3335 15.0348 5.3335 14.6666V7.99992Z"
                    fill="#0F0F11"
                  />
                </svg>
              </NavLink>
              <svg
                className={styles.arrow}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
                  fill="#0F0F11"
                />
              </svg>
              <NavLink to={'/phones'}>
                <span className={styles.product}>{product?.category}</span>
              </NavLink>
              <svg
                className={styles.arrow}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
                  fill="#0F0F11"
                />
              </svg>
              <span className={styles.productName}>{product?.name}</span>
            </div>
            <div className={styles.linkBack}>
              <svg
                className={styles.arrowBack}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
                  fill="#0F0F11"
                />
              </svg>
              <NavLink to={'/'}>
                <span className={styles.back} onClick={() => navigate(-1)}>
                  Back
                </span>
              </NavLink>
            </div>
            <h1 className={styles.detailTitle}>{product?.name}</h1>
            <div className={styles.productDetailsAndSviper}>
              <div className={styles.swiperContainer}>
                <Swiper
                  className={styles.swiperDetails}
                  spaceBetween={10}
                  navigation={true}
                  slidesPerView={1}
                  grabCursor={true}
                  onSlideChange={swiper =>
                    setCurrentSlideIndex(swiper.activeIndex)
                  }
                  autoplay={{
                    delay: 5000,
                  }}
                >
                  {product &&
                    product.images.map((_detail, index) => (
                      <SwiperSlide className={styles.slide} key={index}>
                        {product?.images &&
                          product.images.map((imageUrl, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={imageUrl}
                              alt="Phone"
                              className={styles.smallImage}
                              onClick={() => {
                                setCurrentSlideIndex(imgIndex);
                                setCurrentImageIndex(index);
                              }}
                            />
                          ))}
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className={styles.bigImageContainer}>
                  {product && product.images[currentSlideIndex] && (
                    <img
                      src={product.images[currentSlideIndex]}
                      alt="Big Phone"
                      className={styles.bigImage}
                    />
                  )}
                </div>
              </div>

              <div className={styles.containerColorsAndSpects}>
                <div className={styles.colors}>
                  <div className={styles.colorsWrapper}>
                    <p className={styles.namesDetailsProduct}>
                      Available colors
                    </p>
                    <span
                      className={styles.prodId}
                    >{`ID: ${product?.namespaceId}`}</span>
                  </div>
                  <ul className={styles.colorsList}>
                    {product?.colorsAvailable.map(color => (
                      <NavLink key={color} to={`/${type}/${product.id}`}>
                        <div
                          className={
                            product.color === colors[color]
                              ? `${styles.buttonColor} ${styles.active}`
                              : `${styles.buttonColor}`
                          }
                          style={{ backgroundColor: colors[color] }}
                          onClick={event => handlerProductColor(color, event)}
                        />
                      </NavLink>
                    ))}
                  </ul>
                </div>

                <span className={styles.line}></span>

                <div className={styles.capacityDetails}>
                  <p className={styles.namesDetailsProduct}>Select capacity</p>
                  <ul className={styles.capacityList}>
                    {product?.capacityAvailable.map(capacity => (
                      <NavLink to={`/${type}/${product.id}`} key={capacity}>
                        <div
                          onClick={event =>
                            handlerSelectCapacity(capacity, event)
                          }
                          className={
                            product.capacity === capacity
                              ? `${styles.capacity} ${styles.active}`
                              : styles.capacity
                          }
                        >
                          {capacity}
                        </div>
                      </NavLink>
                    ))}
                  </ul>
                </div>

                <span className={styles.line}></span>

                <div className={styles.priceAndAdd}>
                  <div className={styles.prices}>
                    <span className={styles.priceCurrent}>
                      {`$${product?.priceDiscount}`}
                    </span>
                    <span
                      className={styles.priceOld}
                    >{`$${product?.priceRegular}`}</span>
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button
                      className={
                        !isCart ? `${styles.addButton}` : `${styles.addedCart}`
                      }
                      onClick={() => handlerAddProduct()}
                    >
                      {!isCart ? 'Add to cart' : 'Added to cart'}
                    </button>
                    <button
                      className={styles.likeButton}
                      onClick={() => handlerFavoritsAdd()}
                    >
                      {!isFavorite ? (
                        <img
                          className={styles.like}
                          src={heardBuron}
                          alt="Favorite"
                        ></img>
                      ) : (
                        <img
                          className={styles.like}
                          src={heardBuronActive}
                          alt="Favorite"
                        ></img>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.productSpects}>
                  <div className={styles.spectsContainer}>
                    <span className={styles.name}>Screen</span>
                    <span className={styles.name}>Resolution</span>
                    <span className={styles.name}>Processor</span>
                    <span className={styles.name}>RAM</span>
                  </div>
                  <div className={styles.spectsContainer}>
                    <span className={styles.spects}>{product?.screen}</span>
                    <span className={styles.spects}>{product?.resolution}</span>
                    <span className={styles.spects}>
                      {product?.namespaceId}
                    </span>
                    <span className={styles.spects}>{product?.ram}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aboutProductContainer}>
              <div className={styles.aboutProduct}>
                <h2 className={styles.title}>About</h2>
                <span className={styles.line}></span>
                {product?.description.map(item => (
                  <>
                    <h3 className={styles.titleDeccriptions} key={item.title}>
                      {item.title}
                    </h3>
                    <p className={styles.description}>{item.text}</p>
                  </>
                ))}
              </div>

              <div className={styles.techSpectBlock}>
                <h2 className={styles.title}>Tech specs</h2>
                <span className={styles.line}></span>
                <div className={styles.containerSpect}>
                  <div className={styles.spectsNames}>
                    <span className={styles.name}>Screen</span>
                    <span className={styles.name}>Resolution</span>
                    <span className={styles.name}>Processor</span>
                    <span className={styles.name}>RAM</span>
                    <span className={styles.name}>Built in memory</span>
                    <span className={styles.name}>Camera</span>
                    <span className={styles.name}>Zoom</span>
                    <span className={styles.name}>Cell</span>
                  </div>
                  <div className={styles.spectsSpect}>
                    <span className={styles.spects}>{product?.screen}</span>
                    <span className={styles.spects}>{product?.resolution}</span>
                    <span className={styles.spects}>{product?.processor}</span>
                    <span className={styles.spects}>{product?.ram}</span>
                    <span className={styles.spects}>{product?.capacity}</span>
                    <span className={styles.spects}>{product?.camera}</span>
                    <span className={styles.spects}>{product?.zoom}</span>
                    <span className={styles.spects}>{product?.cell}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.recommendations}>
              <ProductSlider
                title="You may also like"
                phones={recommendationsProduct}
              />
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};
