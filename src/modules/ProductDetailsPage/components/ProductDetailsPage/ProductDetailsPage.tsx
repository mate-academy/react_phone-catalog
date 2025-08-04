import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { Phone, Product } from '../../../shared/utils/types/apiTypes';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { STATUS, Status } from '../../../shared/utils/types/Status';
import { LoadError, LOAD_ERROR } from '../../../shared/utils/types/LoadError';
import { Loader } from '../../../PhonesPage/components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import { ProductSlider } from '../../../HomePage/components/ProductSlider/ProductSlider';
import { useCart } from '../../../CartPage/context/CartContext';
// eslint-disable-next-line max-len
import { useFavourite } from '../../../FavouritesPage/context/FavouritesContext';

classNames.bind(styles);

type Params = {
  category: string;
};

export const ProductDetailsPage = ({ category }: Params) => {
  const [products, setProducts] = useState<Phone[] | undefined>();
  const [sliderProducts, setSliderProducts] = useState<Product[]>();
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const [, setLoadError] = useState<LoadError>(LOAD_ERROR.noError);
  const { productId } = useParams();
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<string>();
  const [activeMemory, setActiveMemory] = useState<string>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addFavourite, removeFavourite, favouriteItems } = useFavourite();

  const loadSliderProducts = useCallback(() => {
    return getProduct('/products.json').then(data => setSliderProducts(data));
  }, []);

  const loadProducts = useCallback(() => {
    return getProduct(`/${category}.json`)
      .then(data => {
        setProducts(data);
        setLoadError(LOAD_ERROR.noError);
        setStatus(STATUS.resolved);
      })
      .catch(() => {
        setLoadError(LOAD_ERROR.couldntload);
        setStatus(STATUS.rejected);
      });
  }, [category]);

  useEffect(() => {
    setStatus(STATUS.pending);
    loadProducts();
    loadSliderProducts();
  }, [loadProducts, loadSliderProducts]);

  if (status === STATUS.resolved && products?.length === 0) {
    setLoadError(LOAD_ERROR.noProducts);
  }

  // eslint-disable-next-line no-console
  const findProduct = products?.find(product => productId === product.name);

  const changePicture = (i: number) => {
    setActiveImgIndex(i);
  };

  const findCartProduct = sliderProducts?.find(
    product => product.itemId === findProduct?.id,
  );

  useEffect(() => {
    setActiveColor(findProduct?.color);
    setActiveMemory(findProduct?.capacity);
  }, [findProduct?.capacity, findProduct?.color]);

  const findFav = favouriteItems.find(fav => fav.id === findProduct?.id);

  return (
    <div className={styles.details}>
      {status === STATUS.pending ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumbs
            firstPath={`${findProduct?.category}`}
            secondPath={findProduct?.name ?? ''}
          />
          <button className={styles.details__back} onClick={() => navigate(-1)}>
            <img src="./icons/ArrowLeft.svg" alt="back-arrow" />
            Back
          </button>
          <h1 className={styles.details__title}>{findProduct?.name}</h1>
          <div className={styles.details__container}>
            <div className={styles['details__container-primary']}>
              <img
                className={styles.details__image}
                src={findProduct?.images[activeImgIndex]}
                alt="main-image"
              />
              <div className={styles.details__images}>
                {findProduct?.images?.map((image, i) => {
                  return (
                    <div key={i}>
                      <img
                        className={classNames(styles.details__picture, {
                          [styles['details__picture--active']]:
                            activeImgIndex === i,
                        })}
                        onClick={() => changePicture(i)}
                        src={image}
                        alt="images"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles['details__container-secondary']}>
              <div className={styles.details__colors}>
                <div className={styles['details__colors-text']}>
                  <p className={styles['details__colors-available']}>
                    Available colors
                  </p>
                  <p className={styles['details__colors-id']}>ID: 802390</p>
                </div>
                <div className={styles['details__colors-container']}>
                  {findProduct?.colorsAvailable.map(color => {
                    return (
                      <div
                        onClick={() => setActiveColor(color)}
                        key={color}
                        className={classNames(
                          styles['details__colors-circle'],
                          {
                            [styles['details__colors-circle--active']]:
                              activeColor === color,
                          },
                        )}
                        style={{ backgroundColor: `${color}` }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.details__capacity}>
                <p className={styles['details__capacity-header']}>
                  Select capacity
                </p>
                <div className={styles['details__capacity-container']}>
                  {findProduct?.capacityAvailable.map(capacity => {
                    return (
                      <div
                        onClick={() => setActiveMemory(capacity)}
                        key={capacity}
                        className={classNames(
                          styles['details__capacity-memory'],
                          {
                            [styles['details__capacity-memory--active']]:
                              capacity === activeMemory,
                          },
                        )}
                      >
                        {capacity}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.details__price}>
                <p className={styles['details__price-discount']}>
                  {`$${findProduct?.priceDiscount}`}
                </p>
                <p className={styles['details__price-regular']}>
                  {`$${findProduct?.priceRegular}`}
                </p>
              </div>
              <div className={styles.details__buttons}>
                <button
                  onClick={() => {
                    if (findCartProduct && findProduct) {
                      const words = findProduct.name.split(' ');

                      const capacities = findProduct.capacityAvailable.map(c =>
                        c.toLowerCase(),
                      );
                      const colors = findProduct.colorsAvailable.flatMap(c =>
                        c.toLowerCase().split(' '),
                      );

                      const baseNameWords = words.filter(word => {
                        const lower = word.toLowerCase();

                        return (
                          !capacities.includes(lower) && !colors.includes(lower)
                        );
                      });

                      const baseName = baseNameWords.join(' ');

                      addItem({
                        id: `${findCartProduct.id}-${activeColor}-${activeMemory}`,
                        name: `${baseName} ${activeMemory} ${activeColor}`,
                        price: findCartProduct.price,
                        quantity: 1,
                        image: findCartProduct.image,
                        color: activeColor || findProduct.color,
                        capacity: activeMemory || findProduct.capacity,
                        category: findProduct.category,
                      });
                    }
                  }}
                >
                  {findCartProduct !== undefined
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>

                <button className={styles.details__favourites}>
                  <img
                    onClick={() => {
                      if (findProduct) {
                        if (findFav !== undefined) {
                          removeFavourite(findFav.id);
                        } else {
                          addFavourite({
                            name: findProduct.name,
                            images: findProduct.images[0],
                            priceDiscount: findProduct.priceDiscount,
                            priceRegular: findProduct.priceRegular,
                            screen: findProduct.screen,
                            ram: findProduct.ram,
                            capacity: findProduct.capacity,
                            id: findProduct.id,
                            category: findProduct.category,
                          });
                        }
                      }
                    }}
                    className={styles.details__heart}
                    src={
                      findFav?.id === findProduct?.id
                        ? './icons/FavouritesFilled.svg'
                        : './icons/Favourite.svg'
                    }
                    alt="heart-icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.details__specification}>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Screen</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.screen}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>
                Resolution
              </p>
              <p className={styles['details__specification-details']}>
                {findProduct?.resolution}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Processor</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.processor}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>RAM</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.ram}
              </p>
            </div>
          </div>
          <div className={styles.details__about}>
            <h3 className={styles['details__about-header']}>About</h3>
            {findProduct?.description.map(({ title, text }) => {
              return (
                <div key={title} className={styles['details__about-container']}>
                  <h4 className={styles['details__about-title']}>{title}</h4>
                  <p className={styles['details__about-text']}>{text}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.details__tech}>
            <h3 className={styles['details__tech-header']}>Tech specs</h3>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Screen</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.screen}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>
                Resolution
              </p>
              <p className={styles['details__specification-details']}>
                {findProduct?.resolution}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Processor</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.processor}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>RAM</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.ram}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>
                Built in memory
              </p>
              <p className={styles['details__specification-details']}>
                {findProduct?.capacity}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Camera</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.camera}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Zoom</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.zoom}
              </p>
            </div>
            <div className={styles['details__specification-container']}>
              <p className={styles['details__specification-name']}>Cell</p>
              <p className={styles['details__specification-details']}>
                {findProduct?.cell.map(cell => `${cell} `)}
              </p>
            </div>
          </div>
          <ProductSlider
            products={sliderProducts?.slice(0, 6)}
            header="You may also like"
          />
        </div>
      )}
    </div>
  );
};
