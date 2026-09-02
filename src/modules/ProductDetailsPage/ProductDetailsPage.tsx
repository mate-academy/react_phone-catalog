import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';

import { useProductDetails } from '../shared/hooks/useProductDetails';
import { useProducts } from '../shared/hooks/useProducts';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { getSuggestedProducts } from '../shared/utils/getSuggestedProducts';
import { useFavorites } from '../shared/context/FavoriteContext';
import { useCart } from '../shared/context/CartContext';
import { Loader } from '../shared/components/Loader';
import { getPublicPath } from '../shared/utils/getPublicPath';

const colorMap: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  blue: '#4a90d9',
  coral: '#ff7f6b',
  gold: '#f9e5c9',
  graphite: '#54524f',
  green: '#a8c8a0',
  midnight: '#1c1c28',
  midnightgreen: '#3f4f45',
  pink: '#f7cdd0',
  purple: '#c8b9e0',
  red: '#c0392b',
  'rose gold': '#e8c4bd',
  rosegold: '#e8c4bd',
  sierrablue: '#a3bfd9',
  silver: '#e3e4e5',
  'sky blue': '#87ceeb',
  'space gray': '#8e8e93',
  'space-gray': '#8e8e93',
  spaceblack: '#2b2b2c',
  spacegray: '#8e8e93',
  starlight: '#f0e6d8',
  yellow: '#f5d76e',
};

const formatCategoryName = (word: string) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : '';

const formatCapacity = (capacity: string) =>
  capacity.replace(/^(\d+)([a-zA-Z]+)$/, '$1 $2');

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading, error } = useProductDetails(productId);
  const { products } = useProducts();
  const { favorites, dispatch: favoritesDispatch } = useFavorites();
  const { cart, dispatch: cartDispatch } = useCart();
  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState('');

  const summaryProduct = useMemo(
    () => products.find(p => p.itemId === productId),
    [products, productId],
  );

  const generateFakeId = (str: string): number => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % 1000000;
    }

    return Math.abs(hash);
  };

  const suggestedProducts = useMemo(() => {
    if (!summaryProduct) {
      return products;
    }

    return getSuggestedProducts(products, +summaryProduct.id, 10);
  }, [products, summaryProduct]);

  useEffect(() => {
    if (product) {
      setActiveImg(product.images[0]);
      setActiveColor(product.color);
      setActiveCapacity(product.capacity);
    }
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div>
        <button
          type="button"
          className={styles.productDetailsPageBack}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className={styles.productDetailsPageTitle}>
          Product was not found
        </h1>
      </div>
    );
  }

  const handleChangeColor = (color: string) => {
    const colorSlug = color.toLowerCase().replace(/\s+/g, '-');
    const expectedItemId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${colorSlug}`;
    const newProduct = products.find(p => p.itemId === expectedItemId);

    if (newProduct) {
      navigate(`/product/${newProduct.itemId}`);
    }
  };

  const handleChangeCapacity = (capacity: string) => {
    const colorSlug = product.color.toLowerCase().replace(/\s+/g, '-');
    const expectedItemId = `${product.namespaceId}-${capacity.toLowerCase()}-${colorSlug}`;
    const newProduct = products.find(p => p.itemId === expectedItemId);

    if (newProduct) {
      navigate(`/product/${newProduct.itemId}`);
    }
  };

  const isLiked = favorites.includes(product.id);
  const isInCart = cart.some(item => item.id === product.id);

  const handleCartToggle = () => {
    if (isInCart) {
      cartDispatch({ type: 'REMOVE_PRODUCT', payload: product.id });
    } else {
      cartDispatch({ type: 'ADD_PRODUCT', payload: product.id });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productDetailsPage}>
          {/* Breadcrumbs */}
          <div className={styles.productDetailsPageNav}>
            <NavLink to="/" className={styles.productDetailsPageIcon}>
              <img src={getPublicPath('img/Home.svg')} alt="homeIcon" />
            </NavLink>
            <span
              className={`${styles.productDetailsPageIcon} ${styles.productDetailsPageArrow}`}
            >
              <img src={getPublicPath('img/comon-arrow.svg')} alt="arrow" />
            </span>
            <NavLink
              to={`/${product.category}`}
              className={`${styles.productDetailsPageLink} ${styles.productDetailsPageLinkActive}`}
            >
              {formatCategoryName(product.category)}
            </NavLink>
            <span
              className={`${styles.productDetailsPageIcon} ${styles.productDetailsPageArrow}`}
            >
              <img src={getPublicPath('img/comon-arrow.svg')} alt="arrow" />
            </span>
            <div className={styles.productDetailsPageLink}>{product.name}</div>
          </div>

          {/* Back Button */}
          <button
            type="button"
            className={styles.productDetailsPageBack}
            onClick={() => navigate(-1)}
          >
            <span className={styles.productDetailsPageBackIcon}>
              <img src={getPublicPath('img/active-arrow.svg')} alt="arrow" />
            </span>
            <span className={styles.productDetailsPageBackText}>Back</span>
          </button>

          <h1 className={styles.productDetailsPageTitle}>{product.name}</h1>

          {/* Main Top Section */}
          <div className={styles.productDetailsPageTop}>
            {/* Gallery */}
            <div className={styles.productDetailsPageImages}>
              {product.images.map(imgSrc => (
                <button
                  key={imgSrc}
                  type="button"
                  className={`${styles.productDetailsPageImage} ${
                    activeImg === imgSrc
                      ? styles.productDetailsPageImageActive
                      : ''
                  }`}
                  onClick={() => setActiveImg(imgSrc)}
                >
                  <img
                    className={styles.productDetailsPageImg}
                    src={`${getPublicPath(imgSrc)}`}
                    alt={product.name}
                  />
                </button>
              ))}
            </div>

            <div>
              <img
                className={styles.productDetailsPageMainImg}
                src={`${getPublicPath(activeImg)}`}
                alt={product.name}
              />
            </div>

            {/* Controls & Short Specs */}
            <div className={styles.productDetailsPageRightDetails}>
              <div className={styles.productDetailsPageColors}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <h3 className={styles.productDetailsPageColorsTitle}>
                    Available colors
                  </h3>
                  <h3 className={styles.productDetailsPageId}>
                    id: {generateFakeId(product.id)}
                  </h3>
                </div>

                <div className={styles.productDetailsPageColorContainer}>
                  {product.colorsAvailable.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.productDetailsPageColor} ${
                        activeColor === color
                          ? styles.productDetailsPageColorActive
                          : ''
                      }`}
                      onClick={() => handleChangeColor(color)}
                      style={{ backgroundColor: colorMap[color] ?? color }}
                    />
                  ))}
                </div>
              </div>

              <span className={styles.productDetailsPageCustomLine} />

              {/* Capacity Selector */}
              <div>
                <h3 className={styles.productDetailsPageColorsTitle}>
                  Select capacity
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.capacityAvailable.map(cap => (
                    <button
                      key={cap}
                      type="button"
                      className={`${styles.productDetailsPageCapacity} ${
                        activeCapacity === cap
                          ? styles.productDetailsPageCapacityActive
                          : ''
                      }`}
                      onClick={() => handleChangeCapacity(cap)}
                    >
                      {formatCapacity(cap)}
                    </button>
                  ))}
                </div>
              </div>

              <span className={styles.productDetailsPageCustomLine} />

              {/* Pricing & Actions */}
              <div>
                <div
                  style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                >
                  <div className={styles.productDetailsPagePrice}>
                    ${product.priceDiscount}
                  </div>
                  <div className={styles.productDetailsPageFullPrice}>
                    ${product.priceRegular}
                  </div>
                </div>

                <div className={styles.productDetailsPageActions}>
                  <button
                    type="button"
                    className={`${styles.productDetailsPageCart} ${
                      isInCart ? styles.productDetailsPageCartAdded : ''
                    }`}
                    onClick={handleCartToggle}
                    disabled={isInCart}
                  >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    type="button"
                    className={`${styles.productDetailsPageFav} ${
                      isLiked ? styles.isLiked : ''
                    }`}
                    onClick={() =>
                      favoritesDispatch({
                        type: 'TOGGLE_FAVORITE',
                        payload: product.id,
                      })
                    }
                  >
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className={styles.particle} />
                    ))}
                    <svg
                      className={styles.productDetailsPageFavImg}
                      viewBox="0 0 24 24"
                    >
                      {/* eslint-disable-next-line max-len */}
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Quick Specs */}
              <div className={styles.productDetailsPageInfo}>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageColorsTitle}>
                    Screen
                  </h3>
                  <div className={styles.productDetailsPageInfoText}>
                    {product.screen}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageColorsTitle}>
                    Resolution
                  </h3>
                  <div className={styles.productDetailsPageInfoText}>
                    {product.resolution}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageColorsTitle}>
                    Processor
                  </h3>
                  <div className={styles.productDetailsPageInfoText}>
                    {product.processor}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageColorsTitle}>RAM</h3>
                  <div className={styles.productDetailsPageInfoText}>
                    {formatCapacity(product.ram)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: About & Tech Specs */}
          <div className={styles.productDetailsPageBottom}>
            <div className={styles.productDetailsPageBottomAbout}>
              <h2 className={styles.productDetailsPageBottomAboutText}>
                About
              </h2>
              <div
                className={`${styles.productDetailsPageCustomLinePro} ${styles.productDetailsPageCustomLine}`}
              />

              {product.description.map(desc => (
                <div
                  key={desc.title}
                  className={styles.productDetailsPageDescriptionItem}
                >
                  <h3 className={styles.productDetailsPageDescriptionTitle}>
                    {desc.title}
                  </h3>
                  <p className={styles.productDetailsPageDescriptionText}>
                    {desc.text}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.productDetailsPageBottomTechSpecs}>
              <h2 className={styles.productDetailsPageBottomTechSpecsText}>
                Tech specs
              </h2>
              <div
                className={`${styles.productDetailsPageCustomLinePro} ${styles.productDetailsPageCustomLine}`}
              />

              <div className={styles.productDetailsPageInformation}>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Screen
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {product.screen}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Resolution
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {product.resolution}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Processor
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {product.processor}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    RAM
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {formatCapacity(product.ram)}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Built in memory
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {formatCapacity(product.capacity)}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Camera
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {product.camera}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Zoom
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {product.zoom}
                  </div>
                </div>
                <div className={styles.productDetailsPageInfoContainer}>
                  <h3 className={styles.productDetailsPageInformationTitle}>
                    Cell
                  </h3>
                  <div className={styles.productDetailsPageInformationText}>
                    {product.cell.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Products Slider */}
      <div className={styles.productDetailsPageSliderContainer}>
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </>
  );
};
