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
import { DetailedProduct } from '../../../types';

// TODO: fetch real product by useParams() category + productId
const RELATED = [
  {
    id: 1,
    category: 'phones',
    itemId: 'apple-iphone-14-pro-128gb-gold',
    image: 'img/phones/apple-iphone-14-pro/gold/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Gold (iMT9G2FS/A)',
    price: 999,
    fullPrice: 1199,
    screen: "6.1' OLED",
    capacity: '128 GB',
    ram: '6 GB',
  },
  {
    id: 2,
    category: 'phones',
    itemId: 'apple-iphone-11-pro-max-256gb-gold',
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 256GB Gold (iMT9G2FS/A)',
    price: 799,
    fullPrice: 1199,
    screen: "6.5' OLED",
    capacity: '256 GB',
    ram: '4 GB',
  },
  {
    id: 3,
    category: 'phones',
    itemId: 'apple-iphone-11-128gb-purple',
    image: 'img/phones/apple-iphone-11/purple/00.webp',
    name: 'Apple iPhone 11 128GB Purple',
    price: 729,
    fullPrice: 867,
    screen: "6.2' IPS",
    capacity: '128 GB',
    ram: '4 GB',
  },
  {
    id: 4,
    category: 'phones',
    itemId: 'apple-iphone-xs-256gb-silver',
    image: 'img/phones/apple-iphone-xs/silver/00.webp',
    name: 'Apple iPhone XS 256GB Silver (iMT9G2FS/A)',
    price: 859,
    fullPrice: 899,
    screen: "5.8' OLED",
    capacity: '256 GB',
    ram: '4 GB',
  },
];

export const ProductPage = () => {
  const { cartIds, addToCart, wishlistIds, toggleWishlist } = useAppContext();
  const { products, loading, error } = useProducts();
  const { category, productId } = useParams();

  const productUrl = new URL(
    `api/${category}.json`,
    window.location.origin + import.meta.env.BASE_URL,
  ).toString();

  const [detailProduct, setDetailProduct] = useState<DetailedProduct | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(detailProduct?.color);
  const [selectedCapacity, setSelectedCapacity] = useState(
    detailProduct?.capacity,
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch(productUrl, { signal: controller.signal })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then(data => {
        const found = data.find(
          (item: DetailedProduct) => item.id === productId,
        );

        setDetailProduct(found);
        setSelectedColor(found.color);
        setSelectedCapacity(found.capacity);
      });

    return () => controller.abort();
  }, [productId]);

  const isLiked = wishlistIds.includes(detailProduct?.id);
  const isInCart = cartIds.includes(detailProduct?.id);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!detailProduct) {
    return <div>Product was not found</div>;
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
                  <img src={img} alt={`${detailProduct.name} view ${i + 1}`} />
                </button>
              );
            })}
          </div>

          <div className={styles.mainImage}>
            <img
              src={detailProduct.images[selectedImage]}
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
                  <button
                    key={color}
                    type="button"
                    className={cn(styles.colorBtn, {
                      [styles.colorBtnActive]: color === selectedColor,
                    })}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color}
                  >
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <p class={styles.productId}>
              ID:
              {products.find(item => item.itemId === detailProduct.id)?.id}
            </p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoSection}>
            <p className={styles.infoLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {detailProduct.capacityAvailable.map(cap => {
                return (
                  <button
                    key={cap}
                    type="button"
                    className={cn(styles.capacityBtn, {
                      [styles.capacityBtnActive]: cap === selectedCapacity,
                    })}
                    onClick={() => setSelectedCapacity(cap)}
                  >
                    {cap}
                  </button>
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
            <button
              type="button"
              className={cn(styles.addToCart, {
                [styles.addedToCart]: isInCart,
              })}
              onClick={() => {
                addToCart(detailProduct.id);
              }}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <WishlistButton
              productId={detailProduct.id}
              isLiked={isLiked}
              toggleWishlist={toggleWishlist}
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

      <ProductSlider title="You may also like" products={RELATED} />
    </>
  );
};
