import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './ProductDetails.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../api/getProductById';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { getSuggestedProducts } from '../../api/getSuggestedProducts';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { Loader } from '../ProductPages/components/Loader/Loader';
import { CartContext } from '../../CartContext';
import { FavouritesContext } from '../../FavouritesContext';
import classNames from 'classnames';

const colorMap: Record<string, string> = {
  black: '#000000',
  green: '#27AE60',
  yellow: '#ffd600',
  white: '#ffffff',
  purple: '#9b59b6',
  red: '#EB5757',
  spacegray: '#4b4b4b',
  midnightgreen: '#5F7170',
  midnight: '#272757',
  gold: '#FCDBC1',
  silver: '#4C4C4C',
  rosegold: '#DEA193',
  coral: '#FF8559',
  pink: '#FF8DA1',
  blue: '#0000FF',
  graphite: '#41424C',
  sierrablue: '#BFDAF7',
  spaceblack: '#0A0C0D',
  'rose gold': '#DEA193',
  'sky blue': '#87CEEB',
  starlight: '#FDE388',
  'space gray': '#4b4b4b',
};

export const ProductDetails: React.FC = () => {
  const cartContext = React.useContext(CartContext);
  const isInCart = (productId: string) => {
    return cartContext?.items.some(item => item.product.itemId === productId);
  };

  const favouritesContext = React.useContext(FavouritesContext);
  const isInFavourites = (productId: string) => {
    return favouritesContext?.favItems.some(item => item.itemId === productId);
  };

  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [productWasNotFound, setProductWasNotFound] = useState(false);

  const [activeImage, setActiveImage] = useState<string | null>(
    product ? product.details.images[0] : null,
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const fetchProductDetails = useCallback(() => {
    setIsLoading(true);
    setError(null);
    getProductById(productId)
      .then(result => {
        if (!result) {
          setProductWasNotFound(true);
          setProduct(null);
        } else {
          setProductWasNotFound(false);
          setProduct(result);
        }
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const suggestedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return getSuggestedProducts(product.basic.itemId, 8);
  }, [product]);

  const updateButtonsState = (
    containerRef: React.RefObject<HTMLDivElement>,
    setPrev: (v: boolean) => void,
    setNext: (v: boolean) => void,
  ) => {
    if (!containerRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setPrev(scrollLeft === 0);
    setNext(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const scroll = (
    containerRef: React.RefObject<HTMLDivElement>,
    direction: 'prev' | 'next',
  ) => {
    if (!containerRef.current) {
      return;
    }

    const firstCard = containerRef.current.children[0] as HTMLElement;
    const gap = 16;
    const offset = firstCard.offsetWidth + gap;

    containerRef.current.scrollBy({
      left: direction === 'prev' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateButtonsState(ref, setPrevDisabled, setNextDisabled);
  }, []);

  useEffect(() => {
    if (product) {
      setActiveImage(product.details.images[0]);
    }
  }, [product]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!product || touchStartX === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    const threshold = 50;

    const i = product.details.images.findIndex(image => image === activeImage);

    if (diff > threshold) {
      if (i !== product.details.images.length - 1) {
        setActiveImage(product.details.images[i + 1]);
      }
    }

    if (diff < -threshold) {
      if (i !== 0) {
        setActiveImage(product.details.images[i - 1]);
      }
    }

    setTouchStartX(null);
  };

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    let newProduct;

    if (product.details.category === 'phones') {
      newProduct = phones.find(
        phone =>
          phone.namespaceId === product.details.namespaceId &&
          phone.capacity === product.details.capacity &&
          phone.color === color,
      );
    }

    if (product.details.category === 'tablets') {
      newProduct = tablets.find(
        tablet =>
          tablet.namespaceId === product.details.namespaceId &&
          tablet.capacity === product.details.capacity &&
          tablet.color === color,
      );
    }

    if (product.details.category === 'accessories') {
      newProduct = accessories.find(
        accessory =>
          accessory.namespaceId === product.details.namespaceId &&
          accessory.capacity === product.details.capacity &&
          accessory.color === color,
      );
    }

    if (newProduct) {
      navigate(`/product/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    let newProduct;

    if (product.details.category === 'phones') {
      newProduct = phones.find(
        phone =>
          phone.namespaceId === product.details.namespaceId &&
          phone.color === product.details.color &&
          phone.capacity === capacity,
      );
    }

    if (product.details.category === 'tablets') {
      newProduct = tablets.find(
        tablet =>
          tablet.namespaceId === product.details.namespaceId &&
          tablet.color === product.details.color &&
          tablet.capacity === capacity,
      );
    }

    if (product.details.category === 'accessories') {
      newProduct = accessories.find(
        accessory =>
          accessory.namespaceId === product.details.namespaceId &&
          accessory.color === product.details.color &&
          accessory.capacity === capacity,
      );
    }

    if (newProduct) {
      navigate(`/product/${newProduct.id}`);
    }
  };

  return (
    <div className={styles.product_details}>
      <div className={styles.product_details__container}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={fetchProductDetails}>Reload</button>
          </div>
        ) : productWasNotFound || !product ? (
          <>
            <div className={styles.empty}>Product was not found</div>
            <img
              className={styles.empty__img}
              src="img/product-not-found.png"
              alt="product-was-not-found"
            />
          </>
        ) : (
          <>
            <div className={styles.breadcrumbs}>
              <Link to="/" className={styles.breadcrumbs__link}>
                <img
                  src="img/icons/home.png"
                  className={styles.breadcrumbs__icon}
                  alt="Home"
                />
              </Link>

              <div className={styles.breadcrumbs__separator}></div>
              <Link
                to={`/${product.details.category}`}
                className={styles['breadcrumbs__link--category']}
              >
                <h4 className={styles.breadcrumbs__current}>
                  {product.details.category}
                </h4>
              </Link>
              <div className={styles.breadcrumbs__separator}></div>
              <div className={styles['breadcrumbs__wrapper-product']}>
                <h4 className={styles.breadcrumbs__product}>
                  {product.details.name}
                </h4>
              </div>
            </div>
            <button
              type="button"
              className={styles.back__button}
              onClick={() => navigate(-1)}
            >
              <div className={styles.back__icon} />
              <h4 className={styles.back__name}>Back</h4>
            </button>

            <h1 className={styles.product__title}>{product.details.name}</h1>

            <div className={styles['grid-container']}>
              <div className={styles.product__gallery}>
                <div
                  className={styles.product__gallery_main}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img src={`${activeImage}`} alt={product.details.name} />
                </div>
                <div className={styles.product__gallery_preview}>
                  {product.details.images.map(image => (
                    <img
                      key={image}
                      src={`${image}`}
                      alt={product.details.name}
                      className={image === activeImage ? styles.active : ''}
                      onClick={() => setActiveImage(image)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.option__container}>
                <div className={styles.colors}>
                  <h4 className={styles.colors__title}>Available colors</h4>
                  <h4
                    className={styles.id__title}
                  >{`ID: ${product.basic.id}`}</h4>
                </div>
                <div className={styles.colors_palette}>
                  {product.details.colorsAvailable.map(color => (
                    <div
                      key={color}
                      className={`${styles.color} ${product.details.color === color ? styles.color__active : ''}`}
                      style={
                        { '--color': colorMap[color] } as React.CSSProperties
                      }
                      onClick={() => handleColorChange(color)}
                    />
                  ))}
                </div>

                <div className={styles.line} />
                <h4 className={styles.capacity__title}>Select capacity</h4>
                <div className={styles.capacity__available}>
                  {product.details.capacityAvailable.map(capacity => (
                    <div
                      key={capacity}
                      className={`${styles.capacity__option} ${product.details.capacity === capacity ? styles.capacity__option__active : ''}`}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      {capacity}
                    </div>
                  ))}
                </div>
                <div className={styles.line} />

                <div className={styles['product-details__prices']}>
                  <h3
                    className={styles['product-details__price']}
                  >{`$${product.basic.price}`}</h3>
                  <h3
                    className={styles['product-details__full-price']}
                  >{`$${product.basic.fullPrice}`}</h3>
                </div>

                <div className={styles['product-details__buttons']}>
                  <button
                    className={styles['product-details__buttons__cart']}
                    onClick={() => {
                      cartContext?.addItem(product.basic);
                    }}
                    disabled={isInCart(product.basic.itemId)}
                  >
                    {isInCart(product.basic.itemId)
                      ? 'Added to cart'
                      : 'Add to cart'}
                  </button>
                  <button
                    className={classNames(
                      styles['product-details__buttons__favourites'],
                      {
                        [styles['product-details__buttons__favourites--red']]:
                          isInFavourites(product.basic.itemId),
                      },
                    )}
                    onClick={() =>
                      isInFavourites(product.basic.itemId)
                        ? favouritesContext?.deleteItem(product.basic.itemId)
                        : favouritesContext?.addItem(product.basic)
                    }
                  ></button>
                </div>

                <div className={styles['product-details__characteristic']}>
                  <h4
                    className={styles['product-details__characteristic__name']}
                  >
                    Screen
                  </h4>
                  <h4
                    className={styles['product-details__characteristic__value']}
                  >
                    {product.details.screen}
                  </h4>
                </div>
                <div className={styles['product-details__characteristic']}>
                  <h4
                    className={styles['product-details__characteristic__name']}
                  >
                    Resolution
                  </h4>
                  <h4
                    className={styles['product-details__characteristic__value']}
                  >
                    {product.details.resolution}
                  </h4>
                </div>
                <div className={styles['product-details__characteristic']}>
                  <h4
                    className={styles['product-details__characteristic__name']}
                  >
                    Processor
                  </h4>
                  <h4
                    className={styles['product-details__characteristic__value']}
                  >
                    {product.details.processor}
                  </h4>
                </div>
                <div className={styles['product-details__characteristic']}>
                  <h4
                    className={styles['product-details__characteristic__name']}
                  >
                    RAM
                  </h4>
                  <h4
                    className={styles['product-details__characteristic__value']}
                  >
                    {product.details.ram}
                  </h4>
                </div>
              </div>
            </div>

            <div className={styles['section__grid-container']}>
              <section className={styles.section__about}>
                <h2 className={styles.section__title}>About</h2>
                <div className={styles.line} />
                {product.details.description.map(description => (
                  <React.Fragment key={description.title}>
                    <h3 className={styles.about__title}>{description.title}</h3>
                    {description.text.map((text, index) => (
                      <h4 key={index} className={styles.about__description}>
                        {text}
                      </h4>
                    ))}
                  </React.Fragment>
                ))}
              </section>

              <section className={styles['section__tech-specs']}>
                <h2 className={styles.section__title}>Tech specs</h2>
                <div className={styles.line} />

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']} ${styles['product-details__characteristic--wider--top']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Screen
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.screen}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Resolution
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.resolution}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Processor
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.processor}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    RAM
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.ram}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Built in memory
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.capacity}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Camera
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.camera}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Zoom
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.zoom}
                  </h4>
                </div>

                <div
                  className={`${styles['product-details__characteristic']} ${styles['product-details__characteristic--wider']}`}
                >
                  <h4
                    className={`${styles['product-details__characteristic__name']} ${styles['product-details__characteristic__name--wider']}`}
                  >
                    Cell
                  </h4>
                  <h4
                    className={`${styles['product-details__characteristic__value']} ${styles['product-details__characteristic__value--wider']}`}
                  >
                    {product.details.cell.join(', ')}
                  </h4>
                </div>
              </section>
            </div>

            <section className={styles['suggested-products']}>
              <div className={styles['models__title-container']}>
                <h2 className={styles['section-title']}>You may also like</h2>
                <div className={styles.models__buttons}>
                  <button
                    className={`${styles.models__button} ${styles['models__button--left']}`}
                    onClick={() => scroll(ref, 'prev')}
                    disabled={prevDisabled}
                  ></button>

                  <button
                    className={`${styles.models__button} ${styles['models__button--right']}`}
                    onClick={() => scroll(ref, 'next')}
                    disabled={nextDisabled}
                  ></button>
                </div>
              </div>
              <div
                className={styles.models__container}
                ref={ref}
                onScroll={() =>
                  updateButtonsState(ref, setPrevDisabled, setNextDisabled)
                }
              >
                {suggestedProducts.map(suggestedProduct => (
                  <div
                    key={suggestedProduct.id}
                    className={styles['product-card']}
                  >
                    <div className={styles['inner-wrapper']}>
                      <Link to={`/product/${suggestedProduct.itemId}`}>
                        <img
                          className={styles['product-card__image']}
                          src={`${suggestedProduct.image}`}
                          alt="model-image"
                        />
                      </Link>
                      <Link
                        to={`/product/${suggestedProduct.itemId}`}
                        className={styles.product__link}
                      >
                        <h4 className={styles['product-card__name']}>
                          {suggestedProduct.name}
                        </h4>
                      </Link>
                    </div>
                    <div className={styles['product-card__prices']}>
                      <h3
                        className={styles['product-card__price']}
                      >{`$${suggestedProduct.price}`}</h3>
                      <h3
                        className={styles['product-card__full-price']}
                      >{`$${suggestedProduct.fullPrice}`}</h3>
                    </div>
                    <div className={styles['product-card__line']}></div>
                    <div className={styles['product-card__details']}>
                      <h4 className={styles['product-card__details__name']}>
                        Screen
                      </h4>
                      <h4 className={styles['product-card__details__value']}>
                        {suggestedProduct.screen}
                      </h4>
                    </div>
                    <div className={styles['product-card__details']}>
                      <h4 className={styles['product-card__details__name']}>
                        Capacity
                      </h4>
                      <h4 className={styles['product-card__details__value']}>
                        {suggestedProduct.capacity}
                      </h4>
                    </div>
                    <div className={styles['product-card__details']}>
                      <h4 className={styles['product-card__details__name']}>
                        RAM
                      </h4>
                      <h4 className={styles['product-card__details__value']}>
                        {suggestedProduct.ram}
                      </h4>
                    </div>
                    <div className={styles['product-card__buttons']}>
                      <button
                        className={styles['product-card__buttons__cart']}
                        onClick={() => cartContext?.addItem(suggestedProduct)}
                        disabled={isInCart(suggestedProduct.itemId)}
                      >
                        {isInCart(suggestedProduct.itemId)
                          ? 'Added to cart'
                          : 'Add to cart'}
                      </button>
                      <button
                        className={classNames(
                          styles['product-card__buttons__favourites'],
                          {
                            [styles['product-card__buttons__favourites--red']]:
                              isInFavourites(suggestedProduct.itemId),
                          },
                        )}
                        onClick={() => {
                          if (isInFavourites(suggestedProduct.itemId)) {
                            favouritesContext?.deleteItem(
                              suggestedProduct.itemId,
                            );
                          } else {
                            favouritesContext?.addItem(suggestedProduct);
                          }
                        }}
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
