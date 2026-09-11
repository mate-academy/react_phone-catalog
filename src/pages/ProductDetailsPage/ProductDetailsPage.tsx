import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';
import {
  ProductCardSale,
  type Product,
} from '../../components/ProductCardSale';

import {
  getSuggestedProducts,
  getProduct,
  getProductByColor,
  getProductByCapacity,
} from '../../api';

import { useContext, useEffect, useRef, useState } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const [isHotStart, setIsHotStart] = useState(true);
  const [isHotEnd, setIsHotEnd] = useState(false);

  const likesProductsRef = useRef<HTMLDivElement>(null);

  const hotCheckScroll = () => {
    if (!likesProductsRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = likesProductsRef.current;

    setIsHotStart(scrollLeft === 0);
    setIsHotEnd(scrollLeft + clientWidth >= scrollWidth);
  };

  const hotScrollLeft = () => {
    likesProductsRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const hotScrollRight = () => {
    likesProductsRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    hotCheckScroll();
  }, [suggestedProducts]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    getProduct(productId).then(item => {
      setProduct(item);
      setIsLoading(false);
      if (item) {
        setSelectedColor(item.color);
        setSelectedCapacity(item.capacity);
        setSelectedImage(item.images[0]);
      }
    });

    getSuggestedProducts(productId).then(products => {
      setSuggestedProducts(products);
    });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <p>Product was not found</p>;
  }

  let categoryName = '';
  let categoryPath = '';

  if (product.category === 'phones') {
    categoryName = 'Phones';
    categoryPath = '/phones';
  }

  if (product.category === 'tablets') {
    categoryName = 'Tablets';
    categoryPath = '/tablets';
  }

  if (product.category === 'accessories') {
    categoryName = 'Accessories';
    categoryPath = '/accessories';
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('ProductCardSale must be used inside FavoritesProvider');
  }

  const { favourites, addFavourite, removeFavourite } = context;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contextCart = useContext(CartContext);

  if (!contextCart) {
    throw new Error('ProductCardSale must be used inside CartProvider');
  }

  const { cartItems, addProduct } = contextCart;

  const isFavourite = favourites.some(favourite => favourite.id === product.id);
  const isInCart = cartItems.some(cart => cart.id === product.id);

  return (
    <>
      <Header />
      <div className={styles.details}>
        <div className={styles.details__header}>
          <Link to="/" className={styles.details__homeLink}>
            <img
              src="img/icons/home.svg"
              alt="Home icon"
              className={styles.details__homeIcon}
            />
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.details__arrowIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <Link to={categoryPath} className={styles.details__headerText}>
            {categoryName}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.details__arrowIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <p className={styles['details__headerText--object']}>
            {product.name}
          </p>
        </div>
        <button onClick={() => navigate(-1)} className={styles.details__back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.details__arrowIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <p className={styles.details__backText}>Back</p>
        </button>
        <h1 className={styles.details__title}>{product.name}</h1>
        <section className={styles.details__lead}>
          <div className={styles.details__photos}>
            <div className={styles.details__photo}>
              <img
                src={`${selectedImage}`}
                alt={product.name}
                className={styles.details__mainImage}
              />
            </div>

            <div className={styles.details__thumbnails}>
              {product.images.map(image => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`${styles.details__thumbnail} ${
                    selectedImage === image
                      ? styles['details__thumbnail--selected']
                      : ''
                  }`}
                >
                  <img
                    src={`${image}`}
                    alt={product.name}
                    className={styles['details__thumbnail--img']}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.details__information}>
            <div className={styles.colors}>
              <div className={styles.colors__title}>
                <p className={styles['colors__title--name']}>
                  Available colors
                </p>
                <p className={styles['colors__title--id']}>ID: 802390</p>
              </div>
              <div className={styles.colors__type}>
                {product.colorsAvailable.map(color => (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label key={color}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={async () => {
                        setSelectedColor(color);

                        const newProduct = await getProductByColor(
                          product,
                          color,
                        );

                        if (newProduct) {
                          navigate(`/product/${newProduct.id}`);
                        }
                      }}
                      className={styles.visuallyHidden}
                    />

                    <span
                      className={`${styles.colors__item} ${
                        selectedColor === color
                          ? styles['colors__item--selected']
                          : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.capacity}>
              <p className={styles.capacity__title}>Select capacity</p>
              <div className={styles.capacity__type}>
                {product.capacityAvailable.map(capacity => (
                  <label key={capacity}>
                    <input
                      type="radio"
                      name="capacity"
                      value={capacity}
                      checked={selectedCapacity === capacity}
                      onChange={async () => {
                        setSelectedCapacity(capacity);

                        const newProduct = await getProductByCapacity(
                          product,
                          capacity,
                        );

                        if (newProduct) {
                          navigate(`/product/${newProduct.id}`);
                        }
                      }}
                      className={styles.visuallyHidden}
                    />

                    <span
                      className={`${styles.capacity__item} ${
                        selectedCapacity === capacity
                          ? styles['capacity__item--selected']
                          : ''
                      }`}
                    >
                      {capacity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.card__info}>
                <h3 className={styles.card__title}>{product.name}</h3>
                <div className={styles.price}>
                  <p className={styles.card__price}>${product.priceRegular}</p>
                  <p className={styles.card__price__sale}>
                    ${product.priceDiscount}
                  </p>
                </div>
              </div>
              <div className={styles.card__buttons}>
                <button
                  className={`${styles.add} ${isInCart ? styles['add--active'] : ''}`}
                  onClick={() => {
                    if (!isInCart) {
                      addProduct(product);
                    }
                  }}
                >
                  {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  className={`${styles.favourite} ${
                    isFavourite ? styles['favourite--active'] : ''
                  }`}
                  onClick={() => {
                    if (isFavourite) {
                      removeFavourite(product.id);
                    } else {
                      addFavourite(product);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.favourite__icon}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5
             5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.card__detailInfo}>
                <div className={styles.card__detailInfoItem}>
                  <p className={styles.name}>Screen</p>
                  <p className={styles.detail}>{product.screen}</p>
                </div>
                <div className={styles.card__detailInfoItem}>
                  <p className={styles.name}>Capacity</p>
                  <p className={styles.detail}>{product.capacity}</p>
                </div>
                <div className={styles.card__detailInfoItem}>
                  <p className={styles.name}>Processor</p>
                  <p className={styles.detail}>{product.processor}</p>
                </div>
                <div className={styles.card__detailInfoItem}>
                  <p className={styles.name}>RAM</p>
                  <p className={styles.detail}>{product.ram}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.details__sections}>
          <section className={styles.about}>
            <h2 className={styles.about__title}>About</h2>

            {product.description.map(description => (
              <div className={styles.about__item} key={description.title}>
                <h3 className={styles['about__item--subTitle']}>
                  {description.title}
                </h3>

                {description.text.map(text => (
                  <p className={styles['about__item--description']} key={text}>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </section>
          <section className={styles.techSpecs}>
            <h2 className={styles.techSpecs__title}>Tech specs</h2>
            <div className={styles.techSpecs__info}>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>Screen</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.screen}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>Resolution</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.resolution}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>Processor</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.processor}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>RAM</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.ram}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>
                  Built in memory
                </h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.capacity}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>Camera</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.camera}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>Zoom</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.zoom}
                </p>
              </div>
              <div className={styles.techSpecs__item}>
                <h3 className={styles['techSpecs__item--title']}>Cell</h3>
                <p className={styles['techSpecs__item--description']}>
                  {product.cell.join(', ')}
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className={styles.likesProducts}>
          <div className={styles.likesProducts__header}>
            <h2 className={styles.likesProducts__title}>You may also like</h2>
            <div className={styles.likesProducts__buttons}>
              <button
                onClick={hotScrollLeft}
                disabled={isHotStart}
                className={styles.likesProducts__button}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={styles.likesProducts__icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                onClick={hotScrollRight}
                disabled={isHotEnd}
                className={styles.likesProducts__button}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={styles.likesProducts__icon}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={likesProductsRef}
            onScroll={hotCheckScroll}
            className={styles.likesProducts__products}
          >
            {suggestedProducts.map(item => (
              <ProductCardSale key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
