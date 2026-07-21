import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetails, Product } from '../../types/Product';
import {
  getProductDetails,
  getSuggestedProducts,
  getProducts,
} from '../../api/products';
import { Loader } from '../Loader';
import { ProductsSlider } from '../ProductsSlider';
import { Breadcrumbs } from '../Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [numericId, setNumericId] = useState<number | null>(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<ProductDetails[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { items: cartItems, addToCart } = useCart();
  const { items: favoriteItems, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    getProductDetails(productId)
      .then(result => {
        if (result.product) {
          setProduct(result.product);
          setSelectedImage(result.product.images[0]);
          setAllProducts(result.allProducts);
          getSuggestedProducts(result.product.category).then(
            setSuggestedProducts,
          );

          getProducts('products').then(allShortProducts => {
            const match = allShortProducts.find(
              p => p.itemId === result.product?.id,
            );

            if (match) {
              setNumericId(match.id);
            }
          });
        } else {
          setNotFound(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (notFound) {
    return <p className={styles.container}>Product was not found</p>;
  }

  if (!product) {
    return null;
  }

  const handleCapacitySelect = (newCapacity: string) => {
    const variant = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.color === product.color &&
        p.capacity === newCapacity,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleColorSelect = (newColor: string) => {
    const variant = allProducts.find(
      p =>
        p.namespaceId === product.namespaceId &&
        p.capacity === product.capacity &&
        p.color === newColor,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const shortProduct: Product = {
    id: numericId || 0,
    category: product.category,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 0,
    image: product.images[0],
  };

  const isInCart = cartItems.some(item => item.product.itemId === product.id);
  const isFavorite = favoriteItems.some(item => item.itemId === product.id);

  return (
    <div className={styles.container}>
      <Breadcrumbs category={product.category} productName={product.name} />

      <button
        className={styles.backButton}
        onClick={() => navigate(`/${product.category}`)}
      >
        <img src="/img/arrow-left.png" alt="Back" />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainGrid}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map(image => (
              <button
                key={image}
                className={
                  image === selectedImage
                    ? `${styles.thumb} ${styles.thumbactive}`
                    : styles.thumb
                }
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={selectedImage} alt={product.name} />
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Available colors</span>
              <span className={styles.itemId}>ID: {numericId}</span>
            </div>
            <div className={styles.colors}>
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={
                    color === product.color
                      ? `${styles.colorCircle} ${styles.colorCircleActive}`
                      : styles.colorCircle
                  }
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Select capacity</span>
            <div className={styles.capacities}>
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  className={
                    capacity === product.capacity
                      ? `${styles.capBox} ${styles.capBoxActive}`
                      : styles.capBox
                  }
                  onClick={() => handleCapacitySelect(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>
            {product.priceRegular !== product.priceDiscount && (
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={
                isInCart
                  ? `${styles.addToCart} ${styles.added}`
                  : styles.addToCart
              }
              onClick={() => addToCart(shortProduct)}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={styles.favButton}
              onClick={() => toggleFavorite(shortProduct)}
            >
              <img
                src={
                  isFavorite ? '/img/favouritesheartlike.png' : '/img/heart.png'
                }
                alt="Favorite"
              />
            </button>
          </div>

          <div className={styles.quickSpecs}>
            <div className={styles.specItem}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className={styles.specItem}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className={styles.specItem}>
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className={styles.specItem}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div>
          <h2 className={styles.sectionTitle}>About</h2>
          {product.description.map(block => (
            <div key={block.title} className={styles.descBlock}>
              <h3>{block.title}</h3>
              {block.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.specsTable}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
            <div className={styles.specRow}>
              <span>Camera</span>
              <span>{product.camera}</span>
            </div>
            <div className={styles.specRow}>
              <span>Zoom</span>
              <span>{product.zoom}</span>
            </div>
            <div className={styles.specRow}>
              <span>Cell</span>
              <span>{product.cell.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggested}>
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};
