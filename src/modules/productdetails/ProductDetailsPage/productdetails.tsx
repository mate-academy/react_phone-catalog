/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import productFromServer from '../../../../public/api/products.json';
import phones from '../../../../public/api/phones.json';
import tablets from '../../../../public/api/tablets.json';
import accessories from '../../../../public/api/accessories.json';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './productdetails.module.scss';
import classNames from 'classnames';
import { ProductPromo } from '../../shared/components/productlistpromo/productpromo';
import { SkipButton } from '../../shared/skip/skip';
import { BreadCrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { useCart } from '../../../utils/Cartcontext/cartcontext';
import { ProductDetails } from '../../../types';
import { Loader } from '../../shared/Loader';
import { getSuggestedProducts } from '../../../utils/getSuggestedProducts/getSuggestedProducts';
/* eslint-enable max-len */

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const location = useLocation();

  /* eslint-disable @typescript-eslint/indent */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productDetail, setProductDetail] = useState<
    ProductDetails | undefined
  >(undefined);
  /* eslint-enable @typescript-eslint/indent */

  const category = location.pathname.split('/')[1];
  const product = [...productFromServer].find(p => p.itemId === productId);

  const data = useMemo(() => {
    const dataMap: Record<string, ProductDetails[]> = {
      phones,
      tablets,
      accessories,
    };

    return dataMap[category] || [];
  }, [category]);

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string | undefined>(
    product?.image,
  );
  const [selectedColor, setSelectedColor] = useState(product?.color);
  const [seletdCapacity, setSelectedCapacity] = useState(product?.capacity);

  const map = productDetail?.category;

  const handleChangeColor = (newColor: string) => {
    if (productDetail) {
      const newId = `${productDetail.namespaceId.toLowerCase()}-${productDetail.capacity.toLocaleLowerCase()}-${newColor?.toLocaleLowerCase()}`;

      navigate(`/${productDetail.category}/${newId}`);
    }
  };

  const handleChangeCapacity = (newCapacity: string) => {
    if (productDetail) {
      const newId = `${productDetail.namespaceId.toLowerCase()}-${newCapacity.toLowerCase()}-${productDetail.color.toLowerCase()}`;

      navigate(`/${productDetail.category}/${newId}`);
    }
  };

  const handleSkip = () => setCurrentIndex(currentIndex + 1);
  const handleSkipBack = () => setCurrentIndex(currentIndex - 1);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedColor(product.color);
    }
  }, [productId, product]);

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(() => {
      setProductDetail(() => data.find(p => p.id === productId));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timerId);
  }, [productId, data]);

  const productName =
    !product || !productDetail ? (
      <h2>Product was not found</h2>
    ) : (
      <h2 className={styles.productdetail__name}>{product?.name}</h2>
    );
  const isPhones = product && productDetail;

  const { addToCart, cart, addToFavo, favoList } = useCart();
  const isAdded = cart.some(p => p.itemId === product?.itemId);
  const isAddedFavo = favoList.some(p => p.itemId === product?.itemId);

  const suggestedProducts = getSuggestedProducts(category);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.productdetail}>
          <BreadCrumbs
            isLocationItemCard={category}
            productId={productId}
            map={map}
          />
          {productName}
          {isPhones && (
            <>
              <div className={styles.productdetail__container}>
                <img
                  className={styles.productdetail__image}
                  src={mainImage}
                  alt=""
                />

                <div className={styles['productdetail__images-container']}>
                  {productDetail?.images.map(imgUrl => (
                    <button
                      className={styles['productdetail__image-button']}
                      key={imgUrl}
                      onClick={() => setMainImage(imgUrl)}
                    >
                      <img
                        className={styles['productdetail__image-slider']}
                        src={imgUrl}
                        alt="phone-images"
                      />
                    </button>
                  ))}
                </div>
                <div className={styles['productdetail__container-grid']}>
                  <div
                    className={styles['productdetail__select-color-content']}
                  >
                    <div className={styles['productdetail__text-content']}>
                      <p className={styles['productdetail__text-color']}>
                        Available colors
                      </p>
                      <p
                        className={styles['productdetail__text-id']}
                      >{`id: ${product?.id}`}</p>
                    </div>
                    <div className={styles['productdetail__colors-content']}>
                      {productDetail?.colorsAvailable.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            setSelectedColor(color);
                            handleChangeColor(color);
                          }}
                          style={{ backgroundColor: color }}
                          className={classNames(
                            styles['productdetail__colors-button'],
                            {
                              [styles['productdetail__colors-button--active']]:
                                selectedColor === color,
                            },
                          )}
                        ></button>
                      ))}
                    </div>
                  </div>

                  <div className={styles['productdetail__capacity-container']}>
                    <p className={styles['productdetail__capacity-text']}>
                      Select capacity
                    </p>
                    <div className={styles['productdetail__capacity-content']}>
                      {productDetail?.capacityAvailable.map(capacity => (
                        <button
                          key={capacity}
                          onClick={() => {
                            setSelectedCapacity(capacity);
                            handleChangeCapacity(capacity);
                          }}
                          className={classNames(
                            styles['productdetail__capacity-button'],
                            {
                              [styles[
                                'productdetail__capacity-button--active'
                              ]]: seletdCapacity === capacity,
                            },
                          )}
                        >
                          {capacity}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div
                    className={
                      styles['productdetail__price-and-buttons-container']
                    }
                  >
                    <div className={styles['productdetail__price-content']}>
                      <p
                        className={styles['productdetail__price-value']}
                      >{`$${product.price}`}</p>
                      <p
                        className={`${styles['productdetail__price-value']} ${styles['productdetail__price-value--discount']}`}
                      >{`$${product?.fullPrice}`}</p>
                    </div>
                    <div className={styles['productdetail__buttons-container']}>
                      <button
                        onClick={() => addToCart(product)}
                        className={classNames(
                          styles['productdetail__action-button'],
                          {
                            [styles['productdetail__action-button--active']]:
                              isAdded,
                          },
                        )}
                      >
                        {isAdded ? 'Added to cart' : 'Add to cart'}
                      </button>
                      <button
                        onClick={() => addToFavo(product)}
                        className={styles['productdetail__action-button-heart']}
                      >
                        <svg
                          className={classNames(
                            styles['productdetail__image-heart'],
                            {
                              [styles['productdetail__image-heart--active']]:
                                isAddedFavo,
                            },
                          )}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d={`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81
                            14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={styles['productdetail__info-text-container']}>
                    <div className={styles['productdetail__info-container']}>
                      <div className={styles['productdetail__info-content']}>
                        <p
                          className={`${styles['productdetail__info-text']} ${styles['productdetail__info-text--grey']}`}
                        >
                          Screen
                        </p>
                        <p
                          className={`${styles['productdetail__info-text']} ${styles['productdetail__info-text--grey']}`}
                        >
                          Resolution
                        </p>
                        <p
                          className={`${styles['productdetail__info-text']} ${styles['productdetail__info-text--grey']}`}
                        >
                          Processor
                        </p>
                        <p
                          className={`${styles['productdetail__info-text']} ${styles['productdetail__info-text--grey']}`}
                        >
                          RAM
                        </p>
                      </div>
                      <div
                        className={`${styles['productdetail__info-content']} ${styles['productdetail__info-content--end']}`}
                      >
                        <p className={styles['productdetail__info-text']}>
                          {productDetail.screen}
                        </p>
                        <p className={styles['productdetail__info-text']}>
                          {productDetail.resolution}
                        </p>
                        <p className={styles['productdetail__info-text']}>
                          {productDetail.processor}
                        </p>
                        <p className={styles['productdetail__info-text']}>
                          {productDetail.ram}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.about}>
                <div className={styles['about__grid-container']}>
                  <h3 className={styles.about__title}>About</h3>
                  <div>
                    {productDetail.description.map(description => (
                      <>
                        <h4
                          className={`${styles['about__description-title']} ${styles['about__description-title--margin']}`}
                        >
                          {description.title}
                        </h4>
                        <p
                          className={`${styles['about__description-text']} ${styles['about__description-text--margin']}`}
                        >
                          {description.text}
                        </p>
                      </>
                    ))}
                  </div>
                </div>
                <div className={styles['about__specification-grid-container']}>
                  <h5 className={styles['about__specification-title']}>
                    Tech specs
                  </h5>
                  <div className={styles['about__specification-container']}>
                    <div className={styles['about__specification-detail']}>
                      <p className={styles['about__specification-text']}>
                        Screen
                      </p>
                      <p className={styles['about__specification-text']}>
                        Resolution
                      </p>
                      <p className={styles['about__specification-text']}>
                        Processor
                      </p>
                      <p className={styles['about__specification-text']}>RAM</p>
                      <p className={styles['about__specification-text']}>
                        Camera
                      </p>
                      <p className={styles['about__specification-text']}>
                        Zoom
                      </p>
                      <p className={styles['about__specification-text']}>
                        Cell
                      </p>
                    </div>
                    <div
                      className={`${styles['about__specification-detail']} ${styles['about__specification-detail--end']}`}
                    >
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.screen}
                      </p>
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.resolution}
                      </p>
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.processor}
                      </p>
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.ram}
                      </p>
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.camera}
                      </p>
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.zoom}
                      </p>
                      <p
                        className={`${styles['about__specification-text']} ${styles['about__specification-text--color']}`}
                      >
                        {productDetail.cell}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.recommended}>
                <div className={styles['recommended__skip-container']}>
                  <h6 className={styles.recommended__title}>
                    You may also like
                  </h6>
                  <SkipButton
                    handleSkip={handleSkip}
                    handleSkipBack={handleSkipBack}
                    currentIndex={currentIndex}
                  />
                </div>
                <ProductPromo
                  currentIndex={currentIndex}
                  suggestedProducts={suggestedProducts}
                />
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};
