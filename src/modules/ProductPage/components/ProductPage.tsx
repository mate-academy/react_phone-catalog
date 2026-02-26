import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { Breadcrumbs } from '../../../components/Breadcrumbs';
import { ProductSlider } from '../../../components/ProductSlider';
import { WishlistButton } from '../../../components/WishlistButton';
import { useProducts } from '../../../hooks/use-products';
import { Loader } from '../../../components/Loader';
import { useAppContext } from '../../../hooks/use-context';
import { BaseProduct, DetailedProduct } from '../../../types';
import { mediaPath } from '../../../utils/PathImg';

export const ProductPage = () => {
  const { cartItems, addToCart, deleteFromCart, wishlistIds, toggleWishlist } =
    useAppContext();
  const { category, productId } = useParams();
  const {
    products: detailedProducts,
    loading,
    error,
  } = useProducts<DetailedProduct>(category);

  const { products: listProducts } = useProducts<BaseProduct>();

  const detailProduct = detailedProducts.find(
    product => product.id === productId,
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const isLiked = detailProduct
    ? wishlistIds.includes(detailProduct.id)
    : false;

  let isInCart = false;

  if (detailProduct) {
    isInCart = cartItems.some(
      item =>
        item.id === detailProduct.id &&
        item.color === selectedColor &&
        item.capacity === selectedCapacity,
    );
  }

  useEffect(() => {
    setSelectedImage(0);
    setSelectedColor(detailProduct ? detailProduct.color : '');
    setSelectedCapacity(detailProduct ? detailProduct.capacity : '');
  }, [detailProduct]);

  const addToCartHandler = () => {
    if (!detailProduct || !selectedColor || !selectedCapacity) {
      return;
    }

    addToCart({
      id: detailProduct.id,
      color: selectedColor,
      capacity: selectedCapacity,
    });
  };

  const removeToCartHandler = () => {
    if (!detailProduct || !selectedColor || !selectedCapacity) {
      return;
    }

    return deleteFromCart({
      id: detailProduct.id,
      color: selectedColor,
      capacity: selectedCapacity,
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!detailProduct) {
    return (
      <>
        <div className={styles.title}>Product was not found</div>
        <Link to="/" className={styles.link}>
          Go to home page
        </Link>
        <img
          className="not-scale"
          src="img/product-not-found.png"
          alt="Product not found"
        />
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: detailProduct.category, to: `/${detailProduct.category}` },
          { label: detailProduct.name },
        ]}
      />

      <Link to={`/${detailProduct.category}`} className={styles.back}>
        <i className="fas fa-chevron-left" />
        Back
      </Link>

      <h1 className={styles.title}>{detailProduct.name}</h1>

      <div className={styles.product}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {detailProduct.images.map((img, i) => {
              return (
                <button
                  key={img}
                  type="button"
                  className={cn(styles.thumbnail, {
                    [styles.thumbnailActive]: i === selectedImage,
                  })}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={mediaPath(img)}
                    alt={`${detailProduct.name} view ${i + 1}`}
                  />
                </button>
              );
            })}
          </div>

          <div className={styles.mainImage}>
            <img
              src={mediaPath(detailProduct.images[selectedImage])}
              alt={detailProduct.name}
            />
          </div>
        </div>

        {/* Info panel */}
        <div className={styles.info}>
          <div className={styles.infoSection}>
            <div>
              <p className={styles.infoLabel}>Available colors</p>
              <div className={styles.colors}>
                {detailProduct.colorsAvailable.map(color => (
                  <Link
                    key={color}
                    className={cn(styles.colorBtn, {
                      [styles.colorBtnActive]: color === selectedColor,
                    })}
                    to={`/${category}/${detailProduct.namespaceId}-${selectedCapacity.toLowerCase()}-${color}`}
                    araia-label={color}
                  >
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: color }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <p className={styles.productId}>
              ID:
              {productId}
            </p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoSection}>
            <p className={styles.infoLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {detailProduct.capacityAvailable.map(cap => {
                return (
                  <Link
                    key={cap}
                    className={cn(styles.capacityBtn, {
                      [styles.capacityBtnActive]: cap === selectedCapacity,
                    })}
                    to={`/${category}/${detailProduct.namespaceId}-${cap.toLowerCase()}-${selectedColor}`}
                    araia-label={cap}
                  >
                    {cap}
                  </Link>
                );
              })}
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.price}>${detailProduct.priceDiscount}</span>
            <span className={styles.fullPrice}>
              ${detailProduct.priceRegular}
            </span>
          </div>

          <div className={styles.ctaRow}>
            {isInCart ? (
              <button
                type="button"
                className={cn(styles.addToCart, {
                  [styles.addedToCart]: isInCart,
                })}
                onClick={removeToCartHandler}
              >
                Added to cart
              </button>
            ) : (
              <button
                type="button"
                className={cn(styles.addToCart)}
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            )}

            <WishlistButton
              productId={detailProduct.id}
              isLiked={isLiked}
              toggleWishlist={toggleWishlist}
              additionalClass="large"
            />
          </div>

          <ul className={styles.shortSpecs}>
            {(
              [
                ['Screen', detailProduct.screen],
                ['Resolution', detailProduct.resolution],
                ['Processor', detailProduct.processor],
                ['RAM', detailProduct.ram],
              ] as [string, string][]
            ).map(
              ([label, value]) =>
                value && (
                  <li key={label} className={styles.shortSpecRow}>
                    <span className={styles.shortSpecLabel}>{label}</span>
                    <span className={styles.shortSpecValue}>{value}</span>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>

      {/* About + Tech specs */}
      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <hr className={styles.sectionDivider} />
          {detailProduct.description.map(section => (
            <div key={section.title} className={styles.aboutSection}>
              <h3 className={styles.aboutTitle}>{section.title}</h3>
              <p className={styles.aboutText}>{section.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <hr className={styles.sectionDivider} />
          <ul className={styles.specsList}>
            {(
              [
                ['Screen', detailProduct.screen],
                ['Resolution', detailProduct.resolution],
                ['Processor', detailProduct.processor],
                ['RAM', detailProduct.ram],
                ['Camera', detailProduct.camera],
                ['Zoom', detailProduct.zoom],
                ['Cell', detailProduct.cell],
              ] as [string, string][]
            ).map(
              ([label, value]) =>
                value && (
                  <li key={label} className={styles.techSpecRow}>
                    <span className={styles.techSpecLabel}>{label}</span>
                    <span className={styles.techSpecValue}>{value}</span>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>

      <ProductSlider title="You may also like" products={listProducts} />
    </>
  );
};
