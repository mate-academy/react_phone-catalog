import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  IoHomeOutline,
  IoChevronForward,
  IoHeartOutline,
  IoHeart,
} from 'react-icons/io5';
import { Product, ProductDetails } from '../../types/Product';
import * as productService from '../../services/productService';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import styles from './ProductDetailsPage.module.scss';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useModal } from '../../context/ModalContext';

// Mapeia nomes de cores para seus códigos hexadecimais
const colorMap: { [key: string]: string } = {
  black: '#000000',
  gold: '#FCDBC1',
  silver: '#F0F0F0',
  spacegray: '#4C4C4C',
  rosegold: '#E0BFB8',
  red: '#B83A48',
  white: '#FFFFFF',
  purple: '#C6B9E5',
  yellow: '#FBE27A',
  green: '#DDE7C7',
  midnightgreen: '#4E5851',
  coral: '#F28B82',
};

export default function ProductDetailsPage() {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const { addToCart, isProductInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { showSuccessModal } = useModal();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!category || !productId) {
      setError('Category or Product ID is missing.');
      setIsLoading(false);
      setProduct(null);

      return;
    }

    setIsLoading(true);
    setError(null);

    productService
      .getProductDetails(category, productId)
      .then(foundProduct => {
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError(`Product with ID ${productId} not found in ${category}.`);
          setProduct(null);
        }
      })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
        setProduct(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, productId]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      productService
        .getSuggestedProducts(product)
        .then(suggested => {
          setSuggestedProducts(suggested);
        })
        .catch(() => {
          // Não quebra a página se a busca por sugestões falhar,
          // apenas não mostra nada.
          setSuggestedProducts([]);
        });
    }
  }, [product]);

  if (isLoading && !product) {
    return <div>Loading product details...</div>;
  }

  if (error && !product) {
    return (
      <div>
        Error: {error}. <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        Product not found. <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  // Função auxiliar para adaptar o objeto 'ProductDetails' para o tipo 'Product'
  // que os contextos (Cart, Favorites) esperam.
  const createProductFromDetails = (): Product | null => {
    if (!product) {
      return null;
    }

    return {
      id: 0, // O 'id' numérico não é usado nos contextos, eles usam 'itemId'.
      category: product.category,
      itemId: product.id,
      name: product.name,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
      image: product.images[0],
      color: product.color,
      year: product.year,
    };
  };

  const handleGoBack = () => navigate(-1);

  const handleColorChange = (newColor: string) => {
    if (isLoading || !product || newColor === product.color) {
      return;
    }

    const newProductId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${newColor}`;

    navigate(`/${product.category}/${newProductId}`, {
      state: { isVariantChange: true },
    });
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (isLoading || !product || newCapacity === product.capacity) {
      return;
    }

    const newProductId = `${product.namespaceId}-${newCapacity.toLowerCase()}-${product.color}`;

    navigate(`/${product.category}/${newProductId}`, {
      state: { isVariantChange: true },
    });
  };

  const handleAddToCart = () => {
    const productForContext = createProductFromDetails();

    if (productForContext) {
      addToCart(productForContext);
      showSuccessModal(`${product.name} foi adicionado ao carrinho!`);
    }
  };

  const isProductFavorite = product ? isFavorite(product.id) : false;

  const handleToggleFavorite = () => {
    if (!product) {
      return;
    }

    const productForContext = createProductFromDetails();

    if (productForContext) {
      if (isProductFavorite) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(productForContext);
      }
    }
  };

  return (
    <div
      className={`${styles.detailsPage} ${isLoading ? styles.contentLoading : ''}`}
    >
      <nav className={styles.breadcrumb}>
        <Link to="/">
          <IoHomeOutline className={styles.homeIcon} aria-hidden="true" />
        </Link>
        <IoChevronForward aria-hidden="true" />
        <Link to={`/${category}`} className={styles.categoryLink}>
          {category}
        </Link>
        <IoChevronForward aria-hidden="true" />
        <span className={styles.productName}>{product.name}</span>
      </nav>

      <button onClick={handleGoBack} className={styles.backButton}>
        <IoChevronForward style={{ transform: 'rotate(180deg)' }} />
        <span>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainContent}>
        <div className={styles.imageGallery}>
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`${styles.thumbnailButton} ${selectedImage === img ? styles.active : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${img}`}
                  alt={`Thumbnail ${index + 1} of ${product.name}`}
                />
              </button>
            ))}
          </div>
          <div className={styles.mainImageContainer}>
            <img
              src={`${import.meta.env.BASE_URL}${selectedImage}`}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.productActions}>
          <div className={styles.selectors}>
            <div className={styles.selectorBlock}>
              <p className={styles.selectorLabel}>Available colors</p>
              <div className={styles.colorSelector}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={`${styles.colorOption} ${color === product.color ? styles.active : ''}`}
                    onClick={() => handleColorChange(color)}
                    aria-label={`Select color ${color}`}
                  >
                    <span
                      style={{ backgroundColor: colorMap[color] || color }}
                      className={styles.colorSwatch}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selectorBlock}>
              <p className={styles.selectorLabel}>Select capacity</p>
              <div className={styles.capacitySelector}>
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    className={`${styles.capacityOption} ${capacity === product.capacity ? styles.active : ''}`}
                    onClick={() => handleCapacityChange(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>
              ${product.priceDiscount}
            </span>
            {product.priceRegular > product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.actionButtons}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={product ? isProductInCart(product.id) : false}
            >
              {product && isProductInCart(product.id)
                ? 'Added to cart'
                : 'Add to cart'}
            </button>
            <button
              className={styles.addToFavoritesButton}
              onClick={handleToggleFavorite}
              aria-label={
                isProductFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              {isProductFavorite ? (
                <IoHeart color="#EB5757" />
              ) : (
                <IoHeartOutline />
              )}
            </button>
          </div>

          <div className={styles.shortSpecs}>
            <div className={styles.specItem}>
              <span>Screen</span>
              <strong>{product.screen}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Resolution</span>
              <strong>{product.resolution}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Processor</span>
              <strong>{product.processor}</strong>
            </div>
            <div className={styles.specItem}>
              <span>RAM</span>
              <strong>{product.ram}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.detailedContent}>
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About</h2>
          <hr className={styles.separator} />
          {product.description.map((section, index) => (
            <article key={index} className={styles.aboutArticle}>
              <h3 className={styles.aboutTitle}>{section.title}</h3>
              {section.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.techSpecsSection}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          {/* <hr className={styles.separator} /> */}
          <div className={styles.techSpecsList}>
            <div className={styles.specItem}>
              <span>Screen</span>
              <strong>{product.screen}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Resolution</span>
              <strong>{product.resolution}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Processor</span>
              <strong>{product.processor}</strong>
            </div>
            <div className={styles.specItem}>
              <span>RAM</span>
              <strong>{product.ram}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Built in memory</span>
              <strong>{product.capacity}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Camera</span>
              <strong>{product.camera}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Zoom</span>
              <strong>{product.zoom}</strong>
            </div>
            <div className={styles.specItem}>
              <span>Cell</span>
              <strong>{product.cell.join(', ')}</strong>
            </div>
          </div>
        </section>
      </div>

      {/* You may also like */}
      <ProductSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
}
