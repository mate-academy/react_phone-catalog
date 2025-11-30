import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classnames from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails, getSuggestedProducts } from '../../api/Products';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../../types/Product';
import { useFavorites } from '../shared/context/FavoritesContext';
import { useCart } from '../shared/context/CartContext';
// eslint-disable-next-line max-len
import { ProductsSlider } from '../shared/components/ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, cart } = useCart();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    getProductDetails(productId)
      .then(data => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        } else {
          setSelectedImage((data as unknown as Product).image || '');
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    getSuggestedProducts().then(setSuggestedProducts);
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return <h1>Product was not found</h1>;
  }

  const images = product.images || [];
  const colors = product.colorsAvailable || [];
  const capacities = product.capacityAvailable || [];
  const description = product.description || [];
  const cell = product.cell || [];

  const getLink = (newColor: string, newCapacity: string) => {
    const colorId = newColor.toLowerCase().replace(/ /g, '-');
    const capacityId = newCapacity.toLowerCase().replace(/ /g, '-');

    return `/product/${product.namespaceId}-${capacityId}-${colorId}`;
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      const category = (product as unknown as Product)?.category || 'phones';

      navigate(`/${category}`, { replace: true });
    }
  };

  const productToAdd: Product = {
    id: product.id,
    category: product.category,
    phoneId: product.namespaceId,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 0,
    image: images[0] || '',
  };

  const isFav = isFavorite(productToAdd);
  const isInCart = cart.some(item => item.id === product.id);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFromFavorites(productToAdd);
    } else {
      addToFavorites(productToAdd);
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(productToAdd);
    }
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs
        category={(product as unknown as Product).category || 'phones'}
        lastItem={product.name}
      />

      <button className={styles.backButton} onClick={handleBack}>
        <img src="/img/icons/ArrowLeft.png" alt="Back" />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topSection}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {images.map(image => (
              <div
                key={image}
                className={classnames(styles.thumbnail, {
                  [styles.selected]: selectedImage === image,
                })}
                onClick={() => setSelectedImage(image)}
              >
                <img src={`/${image}`} alt="Thumbnail" />
              </div>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={`/${selectedImage}`} alt={product.name} />
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.selectorBlock}>
            <span className={styles.selectorLabel}>Available colors</span>
            <div className={styles.colorsGrid}>
              {colors.map(color => (
                <Link
                  key={color}
                  to={getLink(color, product.capacity)}
                  className={classnames(styles.colorCircle, {
                    [styles.selected]: color === product.color,
                  })}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.selectorBlock}>
            <span className={styles.selectorLabel}>Select capacity</span>
            <div className={styles.capacityGrid}>
              {capacities.map(capacity => (
                <Link
                  key={capacity}
                  to={getLink(product.color, capacity)}
                  className={classnames(styles.capacityButton, {
                    [styles.selected]: capacity === product.capacity,
                  })}
                >
                  {capacity}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>
            <span className={styles.priceRegular}>${product.priceRegular}</span>
          </div>

          <div className={styles.buttons}>
            <button
              className={classnames(styles.addToCart, {
                [styles.added]: isInCart, // Optional styling for added state
              })}
              onClick={handleAddToCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              className={classnames(styles.addToFavorite, {
                [styles.isFavorite]: isFav,
              })}
              onClick={handleFavoriteClick}
            >
              {isFav ? (
                <img src="/img/icons/FavoriteFilled.png" alt="FavoriteFilled" />
              ) : (
                <img src="/img/icons/Favorites.png" alt="FavoriteOutlined" />
              )}
            </button>
          </div>

          <div className={styles.specsSummary}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.about}>
          <h3>About</h3>
          {description.map(section => (
            <div key={section.title} className={styles.aboutSection}>
              <h4>{section.title}</h4>
              {/* FIX: Handle text as an array of strings */}
              {Array.isArray(section.text) ? (
                section.text.map(paragraph => (
                  <p key={paragraph} className={styles.aboutText}>
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className={styles.aboutText}>{section.text}</p>
              )}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h3>Tech specs</h3>
          <div className={styles.specRow}>
            <span className={styles.specName}>Screen</span>
            <span className={styles.specValue}>{product.screen}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Resolution</span>
            <span className={styles.specValue}>{product.resolution}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Processor</span>
            <span className={styles.specValue}>{product.processor}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>RAM</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Built in memory</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Camera</span>
            <span className={styles.specValue}>{product.camera}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Zoom</span>
            <span className={styles.specValue}>{product.zoom}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Cell</span>
            <span className={styles.specValue}>{cell.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className={styles.suggestions}>
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};
