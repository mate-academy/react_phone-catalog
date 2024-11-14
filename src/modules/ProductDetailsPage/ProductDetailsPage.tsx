import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import favouritesIcon from '../../../public/img/icons/Favourites.svg';

import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import redIcon from '../../../public/img/icons/red.png';
import styles from './ProductDetailsPage.module.scss';

interface ProductDetailsPageProps {
  productDescription?: Product;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = () => {
  const { itemId, category } = useParams<{
    itemId: string;
    category: string;
  }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState('');

  const [chooseColor, setChooseColor] = useState<string | null>(null);
  const [chooseCapacity, setChooseCapacity] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<
  Product[]
  >([]);
  const { addToCart, cart } = useCart();
  const { favorites, toggleFavorite, isFavorite, } = useFavorites();

  console.log('product', product);

  const isInCart = (id: number) => cart.some(product => product.id === id);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';

      const response = await fetch(`${baseUrl}/${category}.json`);
      const data = await response.json();

      const selectedProduct = data.find(
        (item: Product) => item.id === itemId
      );

      if (selectedProduct) {
        setProduct(selectedProduct);
        setSelectedImage(`./${selectedProduct.images[0]}`);
        setChooseCapacity(selectedProduct.capacity);
        setChooseColor(selectedProduct.color);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedProducts = async () => {
    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:5173/api'
          : 'https://anastasiiakorolko.github.io/react_phone-catalog/api';

      const response = await fetch(`${baseUrl}/${category}.json`);
      const data = await response.json();

      const filteredProducts = data.filter(
        (item: Product) => item.id !== itemId
      );

      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
      const randomSuggested = shuffled.slice(0, shuffled.length);

      setSuggestedProducts(randomSuggested);
    } catch (error) {
      setError('Unable to get recommendation products');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSuggestedProducts();
  }, [itemId, category]);

  const handleReload = () => {
    fetchProducts();
  };

  const handleThumbnailClick = (image: string) => {

    setSelectedImage(image);
  };

  const handleCapacityChange = (capacity: string) => {
    setChooseCapacity(capacity);
  };

  const handleColorChange = (color: string) => {
    setChooseColor(color);
  };

  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        ...product,
        color: chooseColor,
        capacity: chooseCapacity,
      };
      addToCart(productToAdd);
    }
  };
  const handleAddToFavorites = () => {
    if (product) {
      const productToAdd = {
        ...product,
        color: chooseColor,
        capacity: chooseCapacity,
      };
      toggleFavorite(productToAdd);
    }
  };

  const baseImagePath = `./img/${product?.category}/${product?.namespaceId}/${chooseColor}`;

  const imageFiles = ['00.webp', '01.webp', '02.webp'];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`${styles.section} ${styles.sectionProduct__details}`}>

      {product && <Breadcrumbs productDescription={product} />}

      <BackButton />

      <main>
        <h1 className={styles.section__title}>{product?.name}</h1>
        <div className={styles.productPage}>
          <div className={styles.productContent}>
            <div className={styles.productGallery}>
              <div className={`${styles.productGallery} ${styles.productGallery__thumbnails}`}>
                {product?.images.map((fileName, index) => (
                  <img
                    key={index}
                    src={`./${fileName}`}
                    className={`${styles.thumbnail} ${selectedImage === fileName ? styles.active : ''}`}
                    onClick={() =>
                      handleThumbnailClick(`${fileName}`)
                    }
                    alt={`${product?.name} ${chooseColor} ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.productGallery__mainImage}>
              <img className={styles.image}
              src={selectedImage ? `${selectedImage}` : ''}
              alt="Product main view"
              />
            </div>
          </div>

          <div className={styles.productInfo}>
            <div className={styles.colorPicker}>
              <h3 className={`${styles.colorPicker__title} ${styles.pickerTitle}`}>
                Available colors
              </h3>
              <div className={styles.colorPicker__options}>
                {product?.colorsAvailable.map(color => {
                  const isCurrColor = color === product?.color;

                  return (
                    <Link
                      key={color}
                      to={`/product/${product?.category}/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${color.replace(' ', '-')}`}
                      onClick={() => handleColorChange(color)}
                      className={`${styles.colorPicker__option} ${styles[`colorPicker__option--${color.replace(' ', '-')}`]} ${isCurrColor ? 'active' : ''}`}
                    ></Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.capacityPicker}>
              <h3 className={`${styles.capacityPicker__title} ${styles.pickerTitle}`}>
                Select capacity
              </h3>
              <div className={styles.capacityPicker__options}>
                {product?.capacityAvailable.map((capacity: string) => {
                  const isCurrCapacity = capacity === product?.capacity;

                  return (
                    <Link
                      key={capacity}
                      to={`/product/${product?.category}/${product?.namespaceId}-${capacity.toLowerCase()}-${product?.color}`}
                      className={`${styles.capacityPicker__option} ${isCurrCapacity ? styles.active : ''}`}
                      aria-label={`Select ${capacity}`}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      {capacity}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.productPrice}>
              <span className={styles.productPrice__new}>
                {product?.priceDiscount}$
              </span>
              <span className={styles.productPrice__old}>
                {product?.priceRegular}$
              </span>
            </div>

            <div className={styles.productActions}>
              <button
                className={styles.productActions__button}
                onClick={handleAddToCart}>{isInCart(product?.id || 0) ? 'Added to cart' : "Add to cart"}</button>

                <img
                  onClick={handleAddToFavorites}
                  src={isFavorite(product.id) ? redIcon : favouritesIcon}
                  alt="Favourites"
                  className={styles.productActions__icon}
                />

            </div>

            <div className={styles.specs}>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Screen</span>
                <span className={styles.specs__value}>{product?.screen}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Resolution</span>
                <span className={styles.specs__value}>{product?.resolution}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Processor</span>
                <span className={styles.specs__value}>{product?.processor}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>RAM</span>
                <span className={styles.specs__value}>{product?.ram}</span>
              </div>
            </div>
          </div>
          <div className={styles.productId}>
            <div className={styles.productInfo__id}>ID: {product?.id}</div>
          </div>
        </div>

        <section className={styles.productsDetails}>
          <div className={styles.about}>
            <h2 className={styles.about__title}>About</h2>
            {product?.description.map((section, index) => (
              <div key={index} className={`section-${index + 1}`}>
                <h3 className={styles.sectionTitle}></h3>
                {section.text.map((paragraph, idx) => (
                  <p key={idx} className={styles.about__text}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.techSpecs}>
            <h2 className={styles.specs__title}>Tech specs</h2>
            <div className={styles.specs}>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Screen</span>
                <span className={styles.specs__value}>{product?.screen}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Resolution</span>
                <span className={styles.specs__value}>{product?.resolution}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Processor</span>
                <span className={styles.specs__value}>{product?.processor}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>RAM</span>
                <span className={styles.specs__value}>{product?.ram}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Built in memory</span>
                <span className={styles.specs__value}>64 GB</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Camera</span>
                <span className={styles.specs__value}>
                  {product?.camera}
                </span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Zoom</span>
                <span className={styles.specs__value}>{product?.zoom}</span>
              </div>
              <div className={styles.specs__details}>
                <span className={styles.specs__property}>Cell</span>
                <span className={styles.specs__value}>{product?.cell}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ProductsSlider goods={suggestedProducts} title='You may also like'/>
    </div>
  );
};
