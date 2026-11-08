import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getProducts, getSuggestedProducts } from '../../utils/api';

import './ProductDetails.scss';

const getProductGroup = (itemId: string) => {
  return itemId.replace(/-\d+(?:gb|tb|mm)-[^-]+$/i, '');
};

export const ProductDetails = () => {
  const { t } = useLanguage();
  const { state: cart, dispatch: cartDispatch } = useCart();
  const { state: favorites, dispatch: favoritesDispatch } = useFavorites();

  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(false);
    setProduct(null);
    setSelectedImage(0);
    setImages([]);

    Promise.all([getProducts(), getSuggestedProducts(Number(id))])
      .then(([data, suggestions]) => {
        if (cancelled) {
          return;
        }

        setProducts(data);

        const foundProduct = data.find(item => String(item.id) === id);

        if (!foundProduct) {
          setError(true);

          return;
        }

        setProduct(foundProduct);

        setSuggestedProducts(
          suggestions.filter(item => item.id !== foundProduct.id),
        );

        const imageFolder = foundProduct.image.substring(
          0,
          foundProduct.image.lastIndexOf('/'),
        );

        setImages(
          [0, 1, 2, 3, 4].map(
            index => `${imageFolder}/${String(index).padStart(2, '0')}.webp`,
          ),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <main className="product-details">
        <button
          type="button"
          className="product-details__back"
          onClick={() => navigate(-1)}
        >
          ← {t('back')}
        </button>

        <p>{t('productNotFound')}</p>
      </main>
    );
  }

  const productGroup = getProductGroup(product.itemId);

  const variants = products.filter(
    item => getProductGroup(item.itemId) === productGroup,
  );

  const colors = [...new Set(variants.map(item => item.color))];
  const capacities = [...new Set(variants.map(item => item.capacity))];

  const isFavorite = favorites.items.some(item => item.id === product.id);

  const isInCart = cart.items.some(item => item.id === product.id);

  const handleImageError = (image: string) => {
    setImages(current => current.filter(item => item !== image));
    setSelectedImage(0);
  };

  const handleColorChange = (color: string) => {
    const variant =
      variants.find(
        item => item.color === color && item.capacity === product.capacity,
      ) || variants.find(item => item.color === color);

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const variant =
      variants.find(
        item => item.capacity === capacity && item.color === product.color,
      ) || variants.find(item => item.capacity === capacity);

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleCart = () => {
    if (!isInCart) {
      cartDispatch({
        type: 'ADD_TO_CART',
        product,
      });
    }
  };

  const handleFavorite = () => {
    favoritesDispatch({
      type: isFavorite ? 'REMOVE_FROM_FAVORITES' : 'ADD_TO_FAVORITES',
      ...(isFavorite ? { id: product.id } : { product }),
    } as Parameters<typeof favoritesDispatch>[0]);
  };

  const productType =
    product.category === 'phones'
      ? t('productTypePhone')
      : product.category === 'tablets'
        ? t('productTypeTablet')
        : t('productTypeAccessory');

  const aboutDescription = t('aboutDescription')
    .replace('{type}', productType)
    .replace('{screen}', product.screen)
    .replace('{ram}', product.ram)
    .replace('{capacity}', product.capacity);

  const aboutReleased = t('aboutReleased')
    .replace('{year}', String(product.year))
    .replace('{color}', product.color);

  return (
    <main className="product-details">
      <div className="product-details__breadcrumbs">
        <button
          type="button"
          className="product-details__back"
          onClick={() => navigate(-1)}
        >
          ← {t('back')}
        </button>

        <nav className="product-details__breadcrumb-nav">
          <Link to="/" aria-label={t('home')}>
            {t('home')}
          </Link>

          <span>/</span>

          <Link to={`/${product.category}`}>{t(product.category)}</Link>

          <span>/</span>

          <span className="product-details__breadcrumb-current">
            {product.name}
          </span>
        </nav>
      </div>

      <h1 className="product-details__title">{product.name}</h1>

      <div className="product-details__main">
        <div className="product-details__gallery">
          <div className="product-details__thumbnails">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`product-details__thumbnail ${
                  selectedImage === index
                    ? 'product-details__thumbnail--active'
                    : ''
                }`}
                onClick={() => setSelectedImage(index)}
                aria-label={`${t('showImage')} ${index + 1}`}
                aria-pressed={selectedImage === index}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${image}`}
                  alt=""
                  onError={() => handleImageError(image)}
                />
              </button>
            ))}
          </div>

          <div className="product-details__image-wrapper">
            {images.length > 0 ? (
              <img
                key={images[selectedImage]}
                src={`${import.meta.env.BASE_URL}${images[selectedImage]}`}
                alt={product.name}
                className="product-details__image"
                onError={() => handleImageError(images[selectedImage])}
              />
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}${product.image}`}
                alt={product.name}
                className="product-details__image"
              />
            )}
          </div>
        </div>

        <div className="product-details__purchase">
          <div className="product-details__option">
            <div className="product-details__option-heading">
              <h2>{t('color')}</h2>
              <span>{product.color}</span>
            </div>

            <div className="product-details__colors">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`product-details__color ${
                    product.color === color
                      ? 'product-details__color--active'
                      : ''
                  }`}
                  onClick={() => handleColorChange(color)}
                  aria-label={color}
                  aria-pressed={product.color === color}
                  title={color}
                >
                  <span
                    className={`product-details__color-swatch product-details__color-swatch--${color
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-details__option">
            <h2>{t('capacity')}</h2>

            <div className="product-details__capacities">
              {capacities.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  className={`product-details__capacity ${
                    product.capacity === capacity
                      ? 'product-details__capacity--active'
                      : ''
                  }`}
                  onClick={() => handleCapacityChange(capacity)}
                  aria-pressed={product.capacity === capacity}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className="product-details__price">
            <span className="product-details__price-current">
              ${product.price}
            </span>

            {product.fullPrice > product.price && (
              <span className="product-details__price-old">
                ${product.fullPrice}
              </span>
            )}
          </div>

          <div className="product-details__actions">
            <button
              type="button"
              className={`product-details__cart-button ${
                isInCart ? 'product-details__cart-button--added' : ''
              }`}
              onClick={handleCart}
              disabled={isInCart}
            >
              {isInCart ? t('added') : t('addToCart')}
            </button>

            <button
              type="button"
              className={`product-details__favorite ${
                isFavorite ? 'product-details__favorite--active' : ''
              }`}
              onClick={handleFavorite}
              aria-label={t('favorites')}
              aria-pressed={isFavorite}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>

          <div className="product-details__quick-specs">
            <div>
              <span>{t('screen')}</span>
              <strong>{product.screen}</strong>
            </div>

            <div>
              <span>{t('ram')}</span>
              <strong>{product.ram}</strong>
            </div>

            <div>
              <span>{t('capacity')}</span>
              <strong>{product.capacity}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details__information">
        <section className="product-details__about">
          <h2>{t('about')}</h2>

          <div className="product-details__section-content">
            <h3>{product.name}</h3>
            <p>{aboutDescription}</p>
            <p>{aboutReleased}</p>
          </div>
        </section>

        <section className="product-details__specs">
          <h2>{t('techSpecs')}</h2>

          <dl>
            <div>
              <dt>{t('screen')}</dt>
              <dd>{product.screen}</dd>
            </div>

            <div>
              <dt>{t('ram')}</dt>
              <dd>{product.ram}</dd>
            </div>

            <div>
              <dt>{t('capacity')}</dt>
              <dd>{product.capacity}</dd>
            </div>

            <div>
              <dt>{t('color')}</dt>
              <dd>{product.color}</dd>
            </div>

            <div>
              <dt>{t('year')}</dt>
              <dd>{product.year}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="product-details__recommendations">
        <h2>{t('youMayAlsoLike')}</h2>
        <ProductsList products={suggestedProducts} />
      </section>
    </main>
  );
};
