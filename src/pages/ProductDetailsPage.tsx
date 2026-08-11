//# region Imports

import heartIcon from '../../public/img/icons/Favourites (Heart Like).png';
import backArrow from '../../public/img/icons/arrowRight.png';
import heartIconFilled from '../../public/img/icons/heartIconFilled.png';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/fetchProductById';
import { ColorMap } from '../utils/colorMap';

import { Phone } from '../types/phone';
import { Tablet } from '../types/tablet';
import { Accessory } from '../types/accessorie';
import { CartItem } from '../types/cartItem';

import { Loader } from '../components/Loader/Loader';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getRandomProducts } from '../utils/getRandomProducts';
import { AddToFavorites } from '../utils/AddToFavorite';
import { AddToCart } from '../utils/AddToCart';
import { fetchProducts } from '../utils/fetchProducts';

import { NavButton } from '../components/NavButton/NavButton';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { Product } from '../types/product';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/ProductDetailsPage.module.scss';

//#endregion

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Phone | Tablet | Accessory>();
  const [activeImage, setActiveImage] = useState(product?.images[0]);
  const [activeColor, setActiveColor] = useState(product?.color);
  const [activeCapacity, setActiveCapacity] = useState(product?.capacity);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [offers, setOffers] = useState<Product[]>([]);
  const [offersIndex, setOffersIndex] = useState(0);
  const [offersMaxIndex, setOffersMaxIndex] = useState(0);
  const [catalogProduct, setCatalogProduct] = useState<Product>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const slideOffersNext = () => {
    if (offersIndex < offersMaxIndex) {
      setOffersIndex(prev => prev + 1);
    }
  };

  const slideOffersPrev = () => {
    if (offersIndex > 0) {
      setOffersIndex(prev => prev - 1);
    }
  };

  const loadProduct = async () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setIsLoading(true);
    setIsError(null);

    try {
      const getProduct = fetchProductById(productId || '');

      setProduct(getProduct);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }

    const productFromCatalog = fetchProducts().find(
      p => p.itemId === productId,
    );

    setCatalogProduct(productFromCatalog);
  };

  const handleToggleCart = () => {
    if (!catalogProduct) {
      return;
    }

    const result = AddToCart(catalogProduct);

    setIsInCart(result.inCart);
  };

  const handleToggleFavorite = () => {
    if (!catalogProduct) {
      return;
    }

    const result = AddToFavorites(catalogProduct);

    setIsFavorite(result.isActive);
  };

  const createSlug = (value: string) =>
    value.toLowerCase().trim().replace(/\s+/g, '-');

  const handleColorChange = (color: string) => {
    if (!product || !allProducts.length) {
      return;
    }

    setActiveColor(color);

    const capacity = createSlug(product.capacity);
    const colorSlug = createSlug(color);

    const newItemId = `${product.namespaceId}-${capacity}-${colorSlug}`;

    const newProduct = allProducts.find(p => p.itemId === newItemId);

    if (newProduct && newProduct.itemId !== product.id) {
      navigate(`/product/${newProduct.itemId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product || !allProducts.length) {
      return;
    }

    setActiveCapacity(capacity);

    const colorSlug = createSlug(product.color);
    const capacitySlug = createSlug(capacity);

    const newItemId = `${product.namespaceId}-${capacitySlug}-${colorSlug}`;

    const newProduct = allProducts.find(p => p.itemId === newItemId);

    if (newProduct && newProduct.itemId !== product.id) {
      navigate(`/product/${newProduct.itemId}`);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId, loadProduct]);

  useEffect(() => {
    if (product && productId) {
      setActiveImage(product.images[0]);
      setActiveColor(product.color);
      setActiveCapacity(product.capacity);
      const randomProducts = getRandomProducts(productId);

      setOffers(randomProducts);
    }
  }, [product, productId]);

  useEffect(() => {
    if (!catalogProduct) {
      return;
    }

    const stored = localStorage.getItem('favorites');
    const favorites: Product[] = stored ? JSON.parse(stored) : [];

    setIsFavorite(favorites.some(item => item.id === catalogProduct.id));
  }, [catalogProduct]);

  useEffect(() => {
    if (!catalogProduct) {
      return;
    }

    const stored = localStorage.getItem('cart');

    if (stored) {
      const cartItems: CartItem[] = JSON.parse(stored);
      const exists = cartItems.some(
        item => item.product.id === catalogProduct.id,
      );

      setIsInCart(exists);
    }
  }, [catalogProduct]);

  useEffect(() => {
    const products = fetchProducts();

    setAllProducts(products);
  }, []);

  if (!product) {
    return <h2>Product was not found</h2>;
  }

  if (isError) {
    return <ErrorPage reload={loadProduct} />;
  }

  return (
    <div className={styles.productDetails}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.productDetails__container}>
          <Breadcrumbs category={product.category} productName={product.name} />

          <div className={styles.productDetails__back}>
            <div className={styles.productDetails__icon}>
              <img
                className={styles.productDetails__arrow}
                src={backArrow}
                alt="Back icon"
              />
            </div>
            <button
              onClick={() => window.history.back()}
              className={styles.productDetails__backButton}
            >
              <span className={styles.productDetails__linkText}>Back</span>
            </button>
          </div>

          <h1 className={styles.productDetails__name}>{product.name}</h1>

          <div className={styles.productDetails__information}>
            <div className={styles.productDetails__gallery}>
              <div className={styles.productDetails__main}>
                <img
                  className={styles.productDetails__imageMain}
                  src={activeImage}
                  alt={product.name}
                />
              </div>

              <div className={styles.productDetails__viewport}>
                <div className={styles.productDetails__images}>
                  {product.images.map((img, index) => (
                    <img
                      onClick={() => setActiveImage(img)}
                      key={index}
                      className={`${styles.productDetails__imagesItem} ${
                        img === activeImage
                          ? styles['productDetails__imagesItem--active']
                          : ''
                      }`}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.productDetails__options}>
              <div className={styles.productDetails__colors}>
                <div className={styles.productDetails__colorsHeader}>
                  <span>Available colors</span>
                  <span>ID: {product.id}</span>
                </div>
                <div className={styles.productDetails__colorsList}>
                  {product.colorsAvailable.map((color, index) => (
                    <label
                      aria-label={`Color ${color}`}
                      onClick={() => handleColorChange(color)}
                      key={index}
                      className={`${styles.productDetails__colorsLabel} ${
                        color === activeColor
                          ? styles['productDetails__colorsLabel--active']
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        defaultChecked={color === product.color}
                        className={styles.productDetails__colorsRadio}
                      />
                      <span
                        className={styles.productDetails__colorsItem}
                        style={{
                          backgroundColor: ColorMap[color] || '#cccccc',
                        }}
                      />
                    </label>
                  ))}
                </div>
                <div className={styles.productDetails__divider} />
              </div>

              <div className={styles.productDetails__capacity}>
                <span className={styles.productDetails__capacityLabel}>
                  Select capacity
                </span>
                <div className={styles.productDetails__capacityOptions}>
                  {product.capacityAvailable.map((c, index) => (
                    <label
                      key={index}
                      onClick={() => handleCapacityChange(c)}
                      className={`${styles.productDetails__capacityLabelWrapper} ${c === activeCapacity ? styles['productDetails__capacityLabelWrapper--active'] : ''}`}
                    >
                      <input
                        type="radio"
                        name="capacity"
                        value={c}
                        className={styles.productDetails__capacityRadio}
                        defaultChecked={c === product.capacity}
                      />
                      <span
                        className={`${styles.productDetails__capacityOption} ${
                          c === activeCapacity
                            ? styles['productDetails__capacityOption--active']
                            : ''
                        }`}
                      >
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
                <div className={styles.productDetails__divider} />
              </div>

              <div className={styles.productDetails__price}>
                <span className={styles.productDetails__priceCurrent}>
                  ${product.priceDiscount}
                </span>
                <span className={styles.productDetails__priceFull}>
                  ${product.priceRegular}
                </span>
              </div>

              <div className={styles.productDetails__buttons}>
                <button
                  onClick={handleToggleCart}
                  className={`${styles.productDetails__buttonsAdd} ${
                    isInCart ? styles['productDetails__buttons--incart'] : ''
                  }`}
                >
                  {isInCart ? 'Added' : 'Add to cart'}
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={styles.productDetails__buttonsHeart}
                >
                  {isFavorite ? (
                    <img
                      src={heartIconFilled}
                      alt="heart"
                      className={styles.productDetails__buttonsHeartIcon}
                    />
                  ) : (
                    <img
                      src={heartIcon}
                      alt="heart"
                      className={styles.productDetails__buttonsHeartIcon}
                    />
                  )}
                </button>
              </div>

              <div className={styles.productDetails__params}>
                <div className={styles.productDetails__param}>
                  <span className={styles.productDetails__paramTitle}>
                    Screen
                  </span>
                  <span className={styles.productDetails__paramValue}>
                    {product.screen}
                  </span>
                </div>
                <div className={styles.productDetails__param}>
                  <span className={styles.productDetails__paramTitle}>
                    Resolution
                  </span>
                  <span className={styles.productDetails__paramValue}>
                    {product.resolution}
                  </span>
                </div>
                <div className={styles.productDetails__param}>
                  <span className={styles.productDetails__paramTitle}>
                    Processor
                  </span>
                  <span className={styles.productDetails__paramValue}>
                    {product.processor}
                  </span>
                </div>
                <div className={styles.productDetails__param}>
                  <span className={styles.productDetails__paramTitle}>RAM</span>
                  <span className={styles.productDetails__paramValue}>
                    {product.ram}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.productDetails__infoAll}>
            <div className={styles.productDetails__about}>
              <h2 className={styles.productDetails__aboutTitle}>About</h2>
              <div className={styles.productDetails__divider} />

              {product.description.map((desc, index) => (
                <div key={index} className={styles.productDetails__description}>
                  <h3 className={styles.productDetails__descriptionTitle}>
                    {desc.title}
                  </h3>
                  {desc.text.map((paragraph, i) => (
                    <p
                      key={i}
                      className={styles.productDetails__descriptionText}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.productDetails__techs}>
              <h2 className={styles.productDetails__techsTitle}>Tech specs</h2>
              <div className={styles.productDetails__divider} />

              <div className={styles.productDetails__tech}>
                <span className={styles.productDetails__techTitle}>Screen</span>
                <span className={styles.productDetails__techValue}>
                  {product.screen}
                </span>
              </div>
              <div className={styles.productDetails__tech}>
                <span className={styles.productDetails__techTitle}>
                  Resolution
                </span>
                <span className={styles.productDetails__techValue}>
                  {product.resolution}
                </span>
              </div>
              <div className={styles.productDetails__tech}>
                <span className={styles.productDetails__techTitle}>
                  Processor
                </span>
                <span className={styles.productDetails__techValue}>
                  {product.processor}
                </span>
              </div>
              <div className={styles.productDetails__tech}>
                <span className={styles.productDetails__techTitle}>RAM</span>
                <span className={styles.productDetails__techValue}>
                  {product.ram}
                </span>
              </div>

              {'camera' in product && (
                <div className={styles.productDetails__tech}>
                  <span className={styles.productDetails__techTitle}>
                    Camera
                  </span>
                  <span className={styles.productDetails__techValue}>
                    {product.camera}
                  </span>
                </div>
              )}

              {'zoom' in product && (
                <div className={styles.productDetails__tech}>
                  <span className={styles.productDetails__techTitle}>Zoom</span>
                  <span className={styles.productDetails__techValue}>
                    {product.zoom}
                  </span>
                </div>
              )}

              <div className={styles.productDetails__tech}>
                <span className={styles.productDetails__techTitle}>Cell</span>
                <span className={styles.productDetails__techValue}>
                  {product.cell.join(', ')}
                </span>
              </div>
            </div>

            <div className={styles.productDetails__divider} />
          </div>

          <div className={styles.productDetails__offers}>
            <div className={styles.productDetails__offersTitle}>
              <h2 className={styles.productDetails__aboutTitle}>
                You may also like
              </h2>
            </div>
            <div className={styles.productDetails__nav}>
              <NavButton
                direction="left"
                disabled={offersIndex === 0}
                onClick={slideOffersPrev}
              />
              <NavButton
                direction="right"
                disabled={offersIndex >= offersMaxIndex}
                onClick={slideOffersNext}
              />
            </div>
          </div>
          <ProductSlider
            FilterredProducts={offers}
            isDiscounted={true}
            currentIndex={offersIndex}
            onSlide={setOffersIndex}
            onMaxIndexChange={setOffersMaxIndex}
          />
        </div>
      )}
    </div>
  );
};
