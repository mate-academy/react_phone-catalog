import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ImageGallery } from './components/ImageGallery';
import { TechSpecs } from './components/TechSpecs';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { getAssetUrl } from '../../utils/getAssetUrl';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    // Плавне скролення догори при зміні товару в URL
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setLoading(true);

    Promise.all([
      fetch(getAssetUrl('api/phones.json')).then(r => (r.ok ? r.json() : [])),
      fetch(getAssetUrl('api/tablets.json')).then(r => (r.ok ? r.json() : [])),
      fetch(getAssetUrl('api/accessories.json')).then(r =>
        r.ok ? r.json() : [],
      ),
    ])
      .then(([phones, tablets, accessories]) => {
        const allDetails: ProductDetails[] = [
          ...phones,
          ...tablets,
          ...accessories,
        ];

        const found = allDetails.find(item => item.id === productId);

        setProductDetails(found || null);
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoading(false));

    // eslint-disable-next-line no-console
    getProducts().then(setAllProducts).catch(console.error);
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  const currentProduct = allProducts.find(p => p.itemId === productId);
  const category = currentProduct?.category || 'phones';

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/${category}`);
  };

  const inCart = currentProduct
    ? cart.some(item => item.id === currentProduct.itemId)
    : false;
  const favorite = currentProduct ? isFavorite(currentProduct.itemId) : false;

  const handleCartClick = () => {
    if (currentProduct) {
      if (inCart) {
        removeFromCart(currentProduct.itemId);
      } else {
        addToCart(currentProduct);
      }
    }
  };

  const recommendedProducts = allProducts.filter(p => p.itemId !== productId);

  return (
    <div className={styles.details}>
      <Breadcrumbs category={category} productName={productDetails.name} />

      <a
        href={`/${category}`}
        onClick={handleBack}
        className={styles.details__back}
      >
        &lt; Back
      </a>

      <h1 className={styles.details__title}>{productDetails.name}</h1>

      <div className={styles.details__top}>
        <ImageGallery
          images={productDetails.images}
          title={productDetails.name}
        />

        <div className={styles.details__actions}>
          <p className={styles.details__sectionTitle}>Available colors</p>
          <div className={styles.details__colors}>
            {productDetails.colorsAvailable.map(color => {
              const newSlug = productId?.replace(productDetails.color, color);

              return (
                <Link
                  key={color}
                  to={`/product/${newSlug}`}
                  className={`${styles.details__colorBtn} ${
                    productDetails.color === color
                      ? styles.details__colorBtnActive
                      : ''
                  }`}
                >
                  <span style={{ backgroundColor: color }} />
                </Link>
              );
            })}
          </div>

          <hr className={styles.details__divider} />

          <p className={styles.details__sectionTitle}>Select capacity</p>
          <div className={styles.details__capacities}>
            {productDetails.capacityAvailable.map(cap => {
              const newSlug = productId?.replace(
                productDetails.capacity.toLowerCase(),
                cap.toLowerCase(),
              );

              return (
                <Link
                  key={cap}
                  to={`/product/${newSlug}`}
                  className={`${styles.details__capacityBtn} ${
                    productDetails.capacity === cap
                      ? styles.details__capacityBtnActive
                      : ''
                  }`}
                >
                  {cap}
                </Link>
              );
            })}
          </div>

          <hr className={styles.details__divider} />

          <div className={styles.details__priceRow}>
            <span className={styles.details__price}>
              ${productDetails.priceDiscount}
            </span>
            <span className={styles.details__priceRegular}>
              ${productDetails.priceRegular}
            </span>
          </div>

          <div className={styles.details__buttons}>
            <button
              type="button"
              onClick={handleCartClick}
              className={`${styles.details__cartBtn} ${
                inCart ? styles.details__cartBtnSelected : ''
              }`}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              onClick={() => currentProduct && toggleFavorite(currentProduct)}
              className={styles.details__favBtn}
            >
              <img
                src={getAssetUrl(
                  favorite ? 'img/icons/Filled.svg' : 'img/icons/Heart.svg',
                )}
                alt="Favorite"
              />
            </button>
          </div>

          <div className={styles.details__specs}>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Screen</span>
              <span className={styles.details__specValue}>
                {productDetails.screen}
              </span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Resolution</span>
              <span className={styles.details__specValue}>
                {productDetails.resolution}
              </span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>Processor</span>
              <span className={styles.details__specValue}>
                {productDetails.processor}
              </span>
            </div>
            <div className={styles.details__specRow}>
              <span className={styles.details__specLabel}>RAM</span>
              <span className={styles.details__specValue}>
                {productDetails.ram}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details__bottom}>
        <div className={styles.details__description}>
          <h3>About</h3>
          <hr className={styles.details__divider} />
          {productDetails.description.map(item => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              {item.text.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <TechSpecs product={productDetails} />
      </div>

      <ProductsSlider
        title="You may also like"
        products={recommendedProducts}
      />
    </div>
  );
};
