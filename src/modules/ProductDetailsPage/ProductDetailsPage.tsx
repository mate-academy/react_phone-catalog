/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProduct, getProducts } from '../../api/products';

import { ProductsSlider } from '../../components/ProductsSlider';

import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';

import styles from './ProductDetailsPage.module.scss';
import { BASE_URL } from '../../constants/baseUrl';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams();

  const navigate = useNavigate();

  const { cart, addToCart } = useCart();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [product, setProduct] = useState<ProductDetails | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);

      try {
        const currentProduct = await getProduct(
          category || '',
          productId || '',
        );

        setProduct(currentProduct);
        setSelectedImage(0);
      } catch {
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [category, productId]);
  const getColor = (color: string) => {
    const colors: Record<string, string> = {
      spacegray: '#4c4c4c',
      midnightgreen: '#5f7170',
      gold: '#f4e8ce',
      silver: '#e2e3e4',
      black: '#1f2020',
      white: '#f9f6ef',
      red: '#ba0c2e',
      purple: '#e5ddea',
      yellow: '#ffe681',
      green: '#ade1cd',
      coral: '#ee7762',
      blue: '#9bb5ce',
      pink: '#f8d7da',
      graphite: '#41424c',
      sierrablue: '#9bb5ce',
    };

    return colors[color] || color.replace(/-/g, '');
  };

  if (isLoading) {
    return (
      <section className={styles.productDetails}>
        <h1>Loading...</h1>
      </section>
    );
  }

  if (!product) {
    return (
      <section className={styles.productDetails}>
        <h1>Product was not found</h1>
      </section>
    );
  }

  const currentProduct = products.find(
    item => item.category === category && item.itemId === product.id,
  );

  const isAdded = currentProduct
    ? cart.some(item => item.id === currentProduct.id)
    : false;

  const favorite = currentProduct ? isFavorite(currentProduct.id) : false;

  const suggestedProducts = products
    .filter(item => item.category === product.category)
    .filter(item => item.itemId !== product.id)
    .slice(0, 10);

  const findVariant = (color: string, capacity: string) => {
    const normalizedColor = color.toLowerCase().replace(/\s+/g, '-');

    const normalizedCapacity = capacity.toLowerCase().replace(/\s+/g, '');

    return products.find(item => {
      const sameCategory = item.category === product.category;

      const sameColor = item.color.toLowerCase() === color.toLowerCase();

      const sameCapacity =
        item.capacity.toLowerCase() === capacity.toLowerCase();

      if (sameCategory && sameColor && sameCapacity) {
        return true;
      }

      const itemId = item.itemId.toLowerCase();

      return (
        sameCategory &&
        itemId.includes(product.namespaceId.toLowerCase()) &&
        itemId.includes(normalizedColor) &&
        itemId.includes(normalizedCapacity)
      );
    });
  };

  const handleColorChange = (color: string) => {
    const variant = findVariant(color, product.capacity);

    if (variant) {
      navigate(`/${variant.category}/${variant.itemId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const variant = findVariant(product.color, capacity);

    if (variant) {
      navigate(`/${variant.category}/${variant.itemId}`);
    }
  };

  const handleCart = () => {
    if (!currentProduct || isAdded) {
      return;
    }

    addToCart(currentProduct);
  };

  const handleFavorite = () => {
    if (!currentProduct) {
      return;
    }

    if (favorite) {
      removeFavorite(currentProduct.id);
    } else {
      addFavorite(currentProduct);
    }
  };

  return (
    <section className={styles.productDetails}>
      <nav className={styles.breadcrumbs}>
        <Link to="/">Home</Link>

        <span>/</span>

        <Link to={`/${category}`}>{category}</Link>

        <span>/</span>

        <span>{product.name}</span>
      </nav>

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <img src={`${BASE_URL}img/icons/arrow-left.png`} alt="Back" />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.top}>
        <div className={styles.gallery}>
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={classNames({
                [styles.thumbnail]: index !== selectedImage,
                [styles.thumbnailActive]: index === selectedImage,
              })}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={`${BASE_URL}${image.replace(/^\/+/, '')}`}
                alt={product.name}
              />
            </button>
          ))}
        </div>

        <div className={styles.image}>
          <img
            src={`${BASE_URL}${product.images[selectedImage].replace(/^\/+/, '')}`}
            alt={product.name}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.colors}>
            <p className={styles.label}>Available colors</p>

            <div className={styles.colorsList}>
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={classNames({
                    [styles.color]: color !== product.color,
                    [styles.colorActive]: color === product.color,
                  })}
                >
                  <span
                    style={{
                      backgroundColor: getColor(color),
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.capacity}>
            <p className={styles.label}>Select capacity</p>

            <div className={styles.capacityList}>
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  onClick={() => handleCapacityChange(capacity)}
                  className={classNames({
                    [styles.capacityButton]: capacity !== product.capacity,

                    [styles.capacityActive]: capacity === product.capacity,
                  })}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.price}>
            <h2 className={styles.discountPrice}>${product.priceDiscount}</h2>

            <p className={styles.regularPrice}>${product.priceRegular}</p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleCart}
              disabled={isAdded}
              className={classNames(styles.addToCart, {
                [styles.added]: isAdded,
              })}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              onClick={handleFavorite}
              className={classNames(styles.favorite, {
                [styles.favoriteActive]: favorite,
              })}
            >
              <img
                src={
                  favorite
                    ? `${BASE_URL}img/icons/heart-filled.png`
                    : `${BASE_URL}img/icons/heart.png`
                }
                alt="Favorite"
                className={styles.favoriteIcon}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>

          {product.description.map(item => (
            <div key={item.title} className={styles.description}>
              <h3>{item.title}</h3>

              {item.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.specs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>

          <div className={styles.spec}>
            <span>Screen</span>
            <strong>{product.screen}</strong>
          </div>

          <div className={styles.spec}>
            <span>Resolution</span>
            <strong>{product.resolution}</strong>
          </div>

          <div className={styles.spec}>
            <span>Processor</span>
            <strong>{product.processor}</strong>
          </div>

          <div className={styles.spec}>
            <span>RAM</span>
            <strong>{product.ram}</strong>
          </div>

          <div className={styles.spec}>
            <span>Camera</span>
            <strong>{product.camera}</strong>
          </div>

          <div className={styles.spec}>
            <span>Zoom</span>
            <strong>{product.zoom}</strong>
          </div>

          <div className={styles.spec}>
            <span>Cell</span>

            <strong>{product.cell.join(', ')}</strong>
          </div>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </section>
  );
};
