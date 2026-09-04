import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getProductDetails,
  getSuggestedProducts,
} from '../../api/productDetails';
import { ProductDetails } from '../../types/ProductDetails';
import { Product, Category } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getColorValue } from '../../utils/colors';
import { getImageUrl } from '../../constants';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_LABELS: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [family, setFamily] = useState<ProductDetails[]>([]);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });

    setIsLoading(true);
    setNotFound(false);
    setActiveImage(0);

    getProductDetails(productId)
      .then(({ product: loaded, family: loadedFamily }) => {
        setProduct(loaded);
        setFamily(loadedFamily);

        return getSuggestedProducts(loaded.category, loaded.id);
      })
      .then(setSuggested)
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  const colorLinks = useMemo(() => {
    if (!product) {
      return [];
    }

    return product.colorsAvailable.map(color => {
      const match = family.find(
        item => item.color === color && item.capacity === product.capacity,
      );

      return { color, id: match?.id };
    });
  }, [product, family]);

  const capacityLinks = useMemo(() => {
    if (!product) {
      return [];
    }

    return product.capacityAvailable.map(capacity => {
      const match = family.find(
        item => item.capacity === capacity && item.color === product.color,
      );

      return { capacity, id: match?.id };
    });
  }, [product, family]);

  if (isLoading) {
    return <Loader />;
  }

  if (notFound || !product) {
    return (
      <main className={styles.page}>
        <img
          src={getImageUrl('img/product-not-found.png')}
          alt="Product not found"
          className={styles.notFoundImage}
        />

        <p className={styles.notFound}>Product was not found</p>

        <Link to="/" className={styles.backHome}>
          Go back home
        </Link>
      </main>
    );
  }

  const cartProduct: Product = {
    id: 0,
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

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  return (
    <main className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          {
            label: CATEGORY_LABELS[product.category],
            to: `/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ‹ Back
      </button>

      <h1 className={styles.name}>{product.name}</h1>

      <div className={styles.top}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`${styles.thumbnail} ${
                  index === activeImage ? styles.thumbnailActive : ''
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img src={getImageUrl(image)} alt={product.name} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img
              src={getImageUrl(product.images[activeImage])}
              alt={product.name}
            />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Available colors</span>

            <div className={styles.colors}>
              {colorLinks.map(({ color, id }) => (
                <Link
                  key={color}
                  to={id ? `/product/${id}` : '#'}
                  className={`${styles.colorSwatch} ${
                    color === product.color ? styles.colorSwatchActive : ''
                  }`}
                  style={{ backgroundColor: getColorValue(color) }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Select capacity</span>

            <div className={styles.capacities}>
              {capacityLinks.map(({ capacity, id }) => (
                <Link
                  key={capacity}
                  to={id ? `/product/${id}` : '#'}
                  className={`${styles.capacityButton} ${
                    capacity === product.capacity
                      ? styles.capacityButtonActive
                      : ''
                  }`}
                >
                  {capacity}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.priceDiscount}</span>

            {product.priceRegular > product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addToCart} ${
                inCart ? styles.addToCartActive : ''
              }`}
              onClick={() =>
                inCart
                  ? removeFromCart(cartProduct.itemId)
                  : addToCart(cartProduct)
              }
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={`${styles.favoriteButton} ${
                favorite ? styles.favoriteButtonActive : ''
              }`}
              aria-label="Add to favorites"
              onClick={() => toggleFavorite(cartProduct)}
            >
              {favorite ? '♥' : '♡'}
            </button>
          </div>

          <div className={styles.specsShort}>
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
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <section className={styles.about}>
          <h2>About</h2>

          {product.description.map(block => (
            <div key={block.title} className={styles.descriptionBlock}>
              <h3>{block.title}</h3>

              {block.text.map(paragraph => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2>Tech specs</h2>

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

          {product.camera && (
            <div className={styles.specRow}>
              <span>Camera</span>
              <span>{product.camera}</span>
            </div>
          )}

          {product.zoom && (
            <div className={styles.specRow}>
              <span>Zoom</span>
              <span>{product.zoom}</span>
            </div>
          )}

          {product.cell && (
            <div className={styles.specRow}>
              <span>Cell</span>
              <span>{product.cell.join(', ')}</span>
            </div>
          )}
        </section>
      </div>

      {suggested.length > 0 && (
        <section className={styles.suggested}>
          <h2>You may also like</h2>

          <ProductsList products={suggested} />
        </section>
      )}
    </main>
  );
};
