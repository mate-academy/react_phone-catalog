/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FullProduct } from '../../types/FullProduct';
import { ProductType } from '../../enums/ProductType';
import phones from '../../api/phones.json';
import tablets from '../../api/tablets.json';
import accessories from '../../api/accessories.json';
import productsFromServer from '../../api/products.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import type SwiperCore from 'swiper';
import 'swiper/css';
import classNames from 'classnames';
import '../../utils/colors.scss';
import { ProductSlider } from '../Shared/ProductsSlider';
import { useFavouritesButton } from '../../utils/handleFavouritesButton';
import { Product } from '../../types/Product';
import { handleBackButton } from '../../utils/handleBackButton';
import { useAddToCartButton } from '../../utils/addToCart';
import { Loader } from '../../components/Loader';

export const ProductDetailsPage = () => {
  const location = useLocation();
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef<SwiperRef | null>(null);
  const { favourites, handleFavouritesButton } = useFavouritesButton();
  const { cart, handleAddToCartButton } = useAddToCartButton();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const products: FullProduct[] = useMemo(() => {
    if (location.pathname.includes(ProductType.phones)) {
      return [...phones];
    } else if (location.pathname.includes(ProductType.tablets)) {
      return [...tablets];
    } else if (location.pathname.includes(ProductType.accessories)) {
      return [...accessories];
    }

    return [];
  }, [location.pathname]);

  const product: FullProduct | undefined = useMemo(() => {
    return products.find(item => item.id === productId);
  }, [products]);

  const productFromServer = useMemo(() => {
    return (
      productsFromServer.find(item => item.itemId === product?.id) ||
      ({} as Product)
    );
  }, [product]);

  const specs = useMemo(() => {
    return [
      { label: 'Screen', value: product?.screen },
      { label: 'Resolution', value: product?.resolution },
      { label: 'Processor', value: product?.processor },
      { label: 'RAM', value: product?.ram },
      { label: 'Built in memory', value: product?.capacity },
      product?.camera ? { label: 'Camera', value: product?.camera } : null,
      product?.zoom ? { label: 'Zoom', value: product?.zoom } : null,
      { label: 'Cell', value: product?.cell.join(', ') },
    ].filter((spec): spec is { label: string; value: string | undefined } =>
      Boolean(spec),
    );
  }, [product]);

  const suggestedProducts = useMemo(() => {
    const randomIndexes: number[] = [];

    for (let i = 0; i < 12; i++) {
      randomIndexes.push(
        Math.floor(Math.random() * productsFromServer.length) + 1,
      );
    }

    return productsFromServer.filter(item =>
      randomIndexes.includes(productsFromServer.indexOf(item)),
    );
  }, [product]);

  const handleSlideChange = (swiper: SwiperCore) => {
    const activeIndex = swiper.realIndex;

    setCurrentImage(product?.images[activeIndex]);
  };

  const handleImagePreview = (imageLink: string) => {
    const targetIndex = product?.images.indexOf(imageLink);

    if (targetIndex !== null && targetIndex !== undefined) {
      swiperRef.current?.swiper.slideTo(targetIndex);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.productDetails}>
          {product ? (
            <>
              <section className={styles.productDetails__top}>
                <div className={styles.productDetails__breadcrumbs}>
                  <Link
                    to={'/'}
                    className={styles.productDetails__breadcrumbsHomeIcon}
                  />
                  <div
                    className={styles.productDetails__breadcrumbsArrowIcon}
                  />
                  <Link
                    to={`/${product.category}`}
                    className={styles.productDetails__breadcrumbsCategory}
                  >
                    {product.category[0].toUpperCase() +
                      product.category.slice(1)}
                  </Link>
                  <div
                    className={styles.productDetails__breadcrumbsArrowIcon}
                  />
                  <span className={styles.productDetails__breadcrumbsName}>
                    {product.name}
                  </span>
                </div>
                <div className={styles.productDetails__back}>
                  <button
                    className={styles.productDetails__backArrow}
                    onClick={handleBackButton}
                  />
                  <button
                    className={styles.productDetails__backText}
                    onClick={handleBackButton}
                  >
                    Back
                  </button>
                </div>
                <h2 className={styles.productDetails__title}>{product.name}</h2>
              </section>

              <section className={styles.productDetails__card}>
                <div className={styles.productDetails__cardContainer}>
                  <div className={styles.productDetails__imagePreview}>
                    {product.images.map(image => (
                      <button
                        key={image}
                        onClick={() => handleImagePreview(image)}
                        className={classNames(
                          styles.productDetails__imageButton,
                          {
                            [styles['productDetails__imageButton--is-active']]:
                              image === currentImage,
                          },
                        )}
                      >
                        <img
                          src={`${image}`}
                          alt="product image"
                          className={styles.productDetails__image}
                        />
                      </button>
                    ))}
                  </div>
                  <Swiper
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={true}
                    speed={500}
                    onSlideChange={handleSlideChange}
                    className={styles.productDetails__swiper}
                    ref={swiperRef}
                  >
                    {product.images.map(image => (
                      <SwiperSlide key={image}>
                        <img
                          src={`${image}`}
                          alt="product image"
                          className={styles.productDetails__swiperImage}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className={styles.productDetails__parameters}>
                  <div className={styles.productDetails__colors}>
                    <span className={styles.productDetails__colorsAvailable}>
                      Available colors
                    </span>
                    <div className={styles.productDetails__colorsContainer}>
                      {product.colorsAvailable.map(color => {
                        const matchedProduct = products.find(
                          item =>
                            item.color === color &&
                            item.namespaceId === product.namespaceId &&
                            item.capacity === product.capacity,
                        );
                        const normalizedColor = color.split(' ').join('');

                        return (
                          <Link
                            to={`/${product.category}/${matchedProduct ? matchedProduct.id : '#'}`}
                            className={classNames(
                              styles.productDetails__colorsContainerColor,
                              normalizedColor,
                              {
                                [styles[
                                  'productDetails__colorsContainer--is-active'
                                ]]: color === product.color,
                              },
                            )}
                            key={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.productDetails__divider} />
                  <div className={styles.productDetails__capacity}>
                    <span className={styles.productDetails__capacitySelect}>
                      Select capacity
                    </span>
                    <div className={styles.productDetails__capacityContainer}>
                      {product.capacityAvailable.map(capacity => {
                        const matchedProduct = products.find(
                          item =>
                            item.capacity === capacity &&
                            item.namespaceId === product.namespaceId &&
                            item.color === product.color,
                        );

                        return (
                          <Link
                            to={`/${product.category}/${matchedProduct ? matchedProduct.id : '#'}`}
                            className={classNames(
                              styles.productDetails__capacityContainerValue,
                              {
                                [styles[
                                  'productDetails__capacityContainer--is-active'
                                ]]: capacity === product.capacity,
                              },
                            )}
                            key={capacity}
                          >
                            {capacity}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.productDetails__divider} />
                  <div className={styles.productDetails__price}>
                    <span className={styles.productDetails__priceRegular}>
                      {`$${productFromServer.price}`}
                    </span>
                    <span className={styles.productDetails__priceDiscount}>
                      {`$${productFromServer.fullPrice}`}
                    </span>
                  </div>
                  <div className={styles.productDetails__buttons}>
                    <button
                      onClick={() => handleAddToCartButton(productFromServer)}
                      className={classNames(
                        styles.productDetails__addToCartButton,
                        {
                          [styles[
                            'productDetails__addToCartButton--is-active'
                          ]]: cart.some(
                            prod => prod.id === productFromServer.id,
                          ),
                        },
                      )}
                    >
                      {cart.some(prod => prod.id === productFromServer.id)
                        ? 'Added to cart'
                        : 'Add to cart'}
                    </button>
                    <button
                      onClick={() => handleFavouritesButton(productFromServer)}
                      className={classNames(
                        styles.productDetails__addToFavouritesButton,
                        {
                          [styles[
                            'productDetails__addToFavouritesButton--is-active'
                          ]]: favourites.some(
                            fav => fav.id === productFromServer.id,
                          ),
                        },
                      )}
                    />
                  </div>
                  <div className={styles.productDetails__specs}>
                    {specs.slice(0, 4).map(({ label, value }) => (
                      <div
                        key={label}
                        className={styles.productDetails__specsRow}
                      >
                        <span className={styles.productDetails__specsLabel}>
                          {label}
                        </span>
                        <span className={styles.productDetails__specsValue}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={styles.productDetails__about}>
                <h3 className={styles.productDetails__aboutTitle}>About</h3>

                <div className={styles.productDetails__divider} />

                <div className={styles.productDetails__aboutDescription}>
                  {product.description.map(section => (
                    <div
                      className={styles.productDetails__aboutDescriptionSection}
                      key={section.title}
                    >
                      <h4
                        className={
                          styles.productDetails__aboutDescriptionSectionTitle
                        }
                      >
                        {section.title}
                      </h4>

                      <span
                        className={
                          styles.productDetails__aboutDescriptionSectionText
                        }
                      >
                        {section.text}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.productDetails__techSpecs}>
                <h3 className={styles.productDetails__techSpecsTitle}>
                  Tech specs
                </h3>

                <div className={styles.productDetails__divider} />

                <div className={styles.productDetails__techSpecsContainer}>
                  {specs.map(({ label, value }) => (
                    <div
                      key={label}
                      className={styles.productDetails__techSpecsRow}
                    >
                      <span className={styles.productDetails__techSpecsLabel}>
                        {label}
                      </span>
                      <span className={styles.productDetails__techSpecsValue}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.productDetails__mayLike}>
                <ProductSlider
                  products={suggestedProducts}
                  title={'You may also like'}
                />
              </section>
            </>
          ) : (
            <div className={styles.productDetails__error}>
              <h2 className={styles.productDetails__errorText}>
                Product was not found
              </h2>

              <img
                src="./img/product-not-found.png"
                alt="product not found"
                className={styles.productDetails__errorImage}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
