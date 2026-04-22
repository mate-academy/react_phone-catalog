import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import { Price } from '../../components/Price/Price';
/* eslint-disable max-len */
import { AboutBlock } from '../../components/ProductDetailsPageComponents/AboutBlock/AboutBlock';
import { TechSpecBlock } from '../../components/ProductDetailsPageComponents/TechSpecBlock/TechSpecBlock';
import { CapacityBlock } from '../../components/ProductDetailsPageComponents/CapacityBlock/CapacityBlock';
import { ColorSelector } from '../../components/ProductDetailsPageComponents/ColorSelector/ColorSelector';
import { RecommendedSection } from '../../components/ProductDetailsPageComponents/RecommendedSection/RecommendedSection';
/* eslint-enable max-len */
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Product } from '../../components/types/Product';
interface ProductExtended extends Product {
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  colorsAvailable: string[];
  color: string;
  capacityAvailable: string[];
  capacity: string;
  images: string[];
  priceRegular: number;
  priceDiscount: number;
}

export const ProductDetailsPage = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductExtended | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const currentProductId = product ? String(product.itemId || product.id) : '';
  const isInCart = cart.some(
    (item: { id: string }) => item.id === currentProductId,
  );

  // const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const favoriteContext = useContext(FavoritesContext);
  const favorites = favoriteContext?.favorites || [];
  const toggleFavorite = favoriteContext?.toggleFavorite || (() => {});

  const isFavorite = favorites.some(
    (item: Product) => String(item.itemId || item.id) === currentProductId,
  );

  const handleCartClick = () => {
    if (!product) {
      return;
    }

    const targetId = String(product.itemId || product.id);

    if (isInCart) {
      removeFromCart(targetId);
    } else {
      addToCart(product as Product);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const [phones, tablets, accessories] = await Promise.all([
          fetch('/api/phones.json').then(res => res.json()),
          fetch('/api/tablets.json').then(res => res.json()),
          fetch('/api/accessories.json').then(res => res.json()),
        ]);

        const allDetailedProducts = [...phones, ...tablets, ...accessories];

        const found = allDetailedProducts.find(p => p.id === productId);

        if (found) {
          setProduct(found);
          if (found.images && found.images.length > 0) {
            setSelectedImage(found.images[0]);
          }
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
        // console.error('Download error:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError || !product) {
    return <h1 className={styles.errorTitle}>Product was not found</h1>;
  }

  const specs = [
    { label: 'screen', value: product.screen },
    { label: 'resolution', value: product.resolution },
    { label: 'processor', value: product.processor },
    {
      label: 'RAM',
      value: product.ram ? product.ram.replace(/([0-9])([A-Z])/, '$1 $2') : '',
    },
  ];

  return (
    <div className={styles.detailPage}>
      <div className={styles.breadCrumbs}>
        <Link to="/" className={styles.homeIcon}>
          <img src="/img/icons/Home.png" alt="Home" />
        </Link>
        <img
          src="/img/icons/rightArrow.png"
          alt="right"
          className={styles.separator}
        />
        <Link to={`/${product.category}`} className={styles.categoryLink}>
          {product.category}
        </Link>
        <img
          src="/img/icons/rightArrow.png"
          alt="right"
          className={styles.separator}
        />

        <span className={styles.productName}>{product.name}</span>
      </div>
      <div className={styles.backButton}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <img src="/img/icons/rightWhiteArrow.png" alt="back" />
          <span>Back</span>
        </button>
      </div>
      <div className={styles.mainInfo}>
        <h1 className={styles.title}>{product.name}</h1>
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images?.map((img: string) => (
              <div
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`${styles.thumb} ${selectedImage === img ? styles.thumbActive : ''}`}
              >
                <img
                  src={img.startsWith('http') ? img : `/${img}`}
                  alt="preview"
                />
              </div>
            ))}
          </div>

          <div className={styles.mainImageContainer}>
            <img
              src={
                selectedImage.startsWith('http')
                  ? selectedImage
                  : `/${selectedImage}`
              }
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </section>

        <section className={styles.actions}>
          <ColorSelector
            colorsAvailable={product.colorsAvailable}
            currentColor={product.color}
            productId={String(product.id)}
          />

          <CapacityBlock
            capacityAvailable={product.capacityAvailable}
            currentCapacity={product.capacity}
            productId={String(product.id)}
          />

          <div className={styles.detailsPrices}>
            <Price
              discount={product.priceDiscount}
              regular={product.priceRegular}
              showDiscount={true}
            />
          </div>

          <div className={styles.buttonsBlock}>
            <button
              // className={styles.addButton}
              className={`${styles.addButton} ${isInCart ? styles.addedButton : ''}`}
              onClick={handleCartClick}
            >
              {/* Add to cart */}
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={styles.favotiteButton}
              onClick={() => toggleFavorite(product)}
            >
              <img
                src={
                  isFavorite ? '/img/icons/Union.png' : '/img/icons/heart.svg'
                }
                alt="favorite"
              />
            </button>
          </div>

          <div className={styles.specs}>
            {specs.map(spec => (
              <div key={spec.label} className={styles.specRow}>
                <span className={styles.labelText}>{spec.label}</span>
                <span className={styles.valueText}>{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.aboutBlock}>
          <AboutBlock description={product.description} />
        </div>
        <div className={styles.techSpecBlock}>
          <TechSpecBlock product={product} />
        </div>
      </div>

      <RecommendedSection currentProduct={product} />
    </div>
  );
};
