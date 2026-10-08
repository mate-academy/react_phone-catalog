import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';
import { getProducts, getSuggestedProducts } from '../../utils/api';

const getProductGroup = (itemId: string) => {
  return itemId.replace(/-\d+(?:gb|tb|mm)-[^-]+$/i, '');
};

export const ProductDetails = () => {
  const { t } = useLanguage();

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
    setIsLoading(true);
    setError(false);
    setSelectedImage(0);
    setImages([]);

    Promise.all([getProducts(), getSuggestedProducts(Number(id))])
      .then(([data, suggestions]) => {
        setProducts(data);

        const foundProduct = data.find(
          (item: Product) => String(item.id) === id,
        );

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

        const productImages = [0, 1, 2, 3, 4].map(index => {
          return `${imageFolder}/${String(index).padStart(2, '0')}.webp`;
        });

        setImages(productImages);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !product) {
    return <p>{t('productNotFound')}</p>;
  }

  const productGroup = getProductGroup(product.itemId);

  const variants = products.filter(
    item => getProductGroup(item.itemId) === productGroup,
  );

  const colors = [...new Set(variants.map(item => item.color))];

  const capacities = [...new Set(variants.map(item => item.capacity))];

  const handleImageError = (image: string) => {
    setImages(currentImages =>
      currentImages.filter(currentImage => currentImage !== image),
    );

    setSelectedImage(currentIndex => {
      if (currentIndex >= images.length - 1) {
        return Math.max(0, images.length - 2);
      }

      return currentIndex;
    });
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
    <section>
      <button type="button" onClick={() => navigate(-1)}>
        {t('back')}
      </button>

      <nav>
        <Link to="/">{t('home')}</Link>

        {' / '}

        <Link to={`/${product.category}`}>{t(product.category)}</Link>

        {' / '}

        <span>{product.name}</span>
      </nav>

      <h1>{product.name}</h1>

      <div>
        {images.length > 0 && (
          <>
            <img
              src={`${import.meta.env.BASE_URL}${images[selectedImage]}`}
              alt={product.name}
              width="300"
              onError={() => handleImageError(images[selectedImage])}
            />

            <div>
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`${t('showImage')} ${index + 1}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${image}`}
                    alt=""
                    width="60"
                    onError={() => handleImageError(image)}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <p>
        {t('price')}: ${product.price}
      </p>

      {product.fullPrice > product.price && (
        <p>
          {t('fullPrice')} ${product.fullPrice}
        </p>
      )}

      <div>
        <h3>{t('color')}</h3>

        {colors.map(color => (
          <label key={color}>
            <input
              type="radio"
              name="color"
              value={color}
              checked={product.color === color}
              onChange={() => handleColorChange(color)}
            />

            {color}
          </label>
        ))}
      </div>

      <div>
        <h3>{t('capacity')}</h3>

        {capacities.map(capacity => (
          <label key={capacity}>
            <input
              type="radio"
              name="capacity"
              value={capacity}
              checked={product.capacity === capacity}
              onChange={() => handleCapacityChange(capacity)}
            />

            {capacity}
          </label>
        ))}
      </div>

      <section>
        <h2>{t('about')}</h2>

        <p>
          {product.name} {aboutDescription}
        </p>

        <p>{aboutReleased}</p>
      </section>

      <section>
        <h2>{t('techSpecs')}</h2>

        <p>
          <strong>{t('screen')}</strong> {product.screen}
        </p>

        <p>
          <strong>{t('ram')}</strong> {product.ram}
        </p>

        <p>
          <strong>{t('capacity')}</strong> {product.capacity}
        </p>

        <p>
          <strong>{t('color')}</strong> {product.color}
        </p>

        <p>
          <strong>{t('year')}</strong> {product.year}
        </p>
      </section>

      <section>
        <h2>{t('youMayAlsoLike')}</h2>

        <ProductsList products={suggestedProducts} />
      </section>
    </section>
  );
};
