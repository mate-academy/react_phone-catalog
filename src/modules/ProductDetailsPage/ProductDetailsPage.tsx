/* eslint-disable @typescript-eslint/indent */
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
// eslint-disable-next-line max-len
import { useProductDetails } from '../shared/components/hooks/useProductDetails';
import { useProducts } from '../shared/components/hooks/useProducts';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../shared/components/ProductsSlider/ProductsSlider';
import { getImg } from '../../utils/getImageUrl';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  // which category from URL
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const category = pathname.split('/')[1];

  const { product, loading, error, notFound } = useProductDetails(
    category,
    productId || '',
  );
  const { products } = useProducts();

  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, cartItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isAddedToCart = cartItems.some(item => item.id === productId);
  const isLiked = product ? isFavorite(product.id) : false;

  // Random products
  const suggestedProducts = useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [products]);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className={styles.notFound}>
        <img
          src={getImg('/img/product-not-found.png')}
          alt="Product not found"
          className={styles.notFoundImage}
        />
        <p className={styles.notFoundText}>Product was not found</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const productToAction = {
    id: 0,
    itemId: product.id,
    category: product.category,
    name: product.name,
    price: product.priceDiscount,
    fullPrice: product.priceRegular,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 0,
    image: product.images[0],
  };

  const currentColor = product.color;
  const currentCapacity = product.capacity;

  const handleColorSelect = (color: string) => {
    const capacity = currentCapacity.toLowerCase().replace(' ', '');
    const colorFormatted = color.replace(' ', '-');
    const newId = `${product.namespaceId}-${capacity}-${colorFormatted}`;

    navigate(`/${category}/${newId}`);
  };

  const handleCapacitySelect = (cap: string) => {
    const capacity = cap.toLowerCase().replace(' ', '');
    const colorFormatted = currentColor.replace(' ', '-');
    const newId = `${product.namespaceId}-${capacity}-${colorFormatted}`;

    navigate(`/${category}/${newId}`);
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          {
            label: category.charAt(0).toUpperCase() + category.slice(1),
            path: `/${category}`,
          },
          { label: product.name },
        ]}
      />

      {/* Back button */}
      <button className={styles.back} onClick={() => navigate(-1)}>
        <img src={getImg('/img/icons/arrow-left.svg')} alt="back" />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      {/* Main content */}
      <div className={styles.main}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <button
                key={img}
                className={`${styles.thumbnail} ${index === selectedImage ? styles.thumbnailActive : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={getImg(img)} alt={product.name} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img
              src={getImg(product.images[selectedImage])}
              alt={product.name}
            />
          </div>
        </div>

        {/* Options */}
        <div className={styles.options}>
          {/* Colors */}
          <div className={styles.optionGroup}>
            <div className={styles.optionHeader}>
              <p className={styles.optionLabel}>Available colors</p>
              <p className={styles.productId}>ID: {product.namespaceId}</p>
            </div>
            <div className={styles.colors}>
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={`${styles.colorBtn} ${color === currentColor ? styles.colorBtnActive : ''}`}
                  onClick={() => handleColorSelect(color)}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Capacity */}
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {product.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  className={`${styles.capacityBtn} ${cap === currentCapacity ? styles.capacityBtnActive : ''}`}
                  onClick={() => handleCapacitySelect(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Price */}
          <div className={styles.prices}>
            <span className={styles.price}>${product.priceDiscount}</span>
            <span className={styles.fullPrice}>${product.priceRegular}</span>
          </div>

          {/* Buttons */}
          <div className={styles.actions}>
            <button
              className={`${styles.addToCart} ${isAddedToCart ? styles.addToCartActive : ''}`}
              onClick={() => productToAction && addToCart(productToAction)}
            >
              {isAddedToCart ? 'Added' : 'Add to cart'}
            </button>

            <button
              className={`${styles.favorite} ${isLiked ? styles.favoriteActive : ''}`}
              onClick={() => productToAction && toggleFavorite(productToAction)}
            >
              <img
                src={getImg(
                  `img/icons/fav-heart-like${isLiked ? '-red' : ''}.svg`,
                )}
                alt="favorite"
              />
            </button>
          </div>

          {/* Short specs */}
          <div className={styles.shortSpecs}>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <span className={styles.specName}>Screen</span>
                <span className={styles.specValue}>{product.screen}</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specName}>Resolution</span>
                <span className={styles.specValue}>{product.resolution}</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specName}>Processor</span>
                <span className={styles.specValue}>{product.processor}</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specName}>RAM</span>
                <span className={styles.specValue}>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        {/* About */}
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {product.description.map(desc => (
            <div key={desc.title} className={styles.descSection}>
              <h3 className={styles.descTitle}>{desc.title}</h3>
              {desc.text.map(text => (
                <p key={text} className={styles.descText}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Tech specs */}
        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <div className={styles.specs}>
            <div className={styles.spec}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
            {product.camera && (
              <div className={styles.spec}>
                <span className={styles.specName}>Camera</span>
                <span className={styles.specValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.spec}>
                <span className={styles.specName}>Zoom</span>
                <span className={styles.specValue}>{product.zoom}</span>
              </div>
            )}
            <div className={styles.spec}>
              <span className={styles.specName}>Cell</span>
              <span className={styles.specValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
