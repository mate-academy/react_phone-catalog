import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, ProductDetails } from '../../types';
import {
  getProductDetailsById,
  getProductVariant,
  getSuggestedProducts,
} from '../../utils/api';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        return;
      }

      try {
        setLoading(true);
        const productData = await getProductDetailsById(productId);

        if (productData) {
          setProduct(productData);
          setSelectedColor(productData.color);
          setSelectedCapacity(productData.capacity);
          // Fetch suggested products
          const suggested = await getSuggestedProducts(productId);

          setSuggestedProducts(suggested);
        } else {
          setError('Product was not found');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // const handleBack = () => {
  //   navigate(-1);
  // };

  const handleAddToCart = () => {
    if (product) {
      // Convert ProductDetails to Product for cart
      const cartProduct: Product = {
        id: 0, // Not used
        category: product.category,
        itemId: product.id,
        name: product.name,
        fullPrice: product.priceRegular,
        price: product.priceDiscount,
        screen: product.screen,
        capacity: selectedCapacity || product.capacity,
        color: selectedColor || product.color,
        ram: product.ram,
        year: 2023, // Not available
        image: product.images[0],
      };

      addToCart(cartProduct);
    }
  };

  const handleColorSelect = async (color: string) => {
    if (!product) {
      return;
    }

    if (product.color === color) {
      return;
    }

    const capacity = selectedCapacity || product.capacity;
    const variant = await getProductVariant(
      product.category,
      product.namespaceId,
      capacity,
      color,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id);
      } else {
        // Convert to Product for favorites
        const favProduct: Product = {
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
          year: 2023,
          image: product.images[0],
        };

        addToFavorites(favProduct);
      }
    }
  };

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <p>{error || 'Product was not found'}</p>
      </div>
    );
  }

  return (
    <div className={styles.productDetailsPage}>
      <nav className={styles.breadcrumbs}>
        {/* <button onClick={handleBack} className={styles.backButton}>
          Back
        </button> */}
        <span>Home</span>
        <span>&gt;</span>
        <span>{product.category}</span>
        <span>&gt;</span>
        <span>{product.name}</span>
      </nav>

      <div className={styles.productContent}>
        <div className={styles.productImages}>
          <div className={styles.mainImage}>
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className={styles.thumbnailImages}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={selectedImage === index ? styles.active : ''}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <h1>{product.name}</h1>

          <div className={styles.price}>
            <span className={styles.currentPrice}>
              ${product.priceDiscount}
            </span>
            <span className={styles.oldPrice}>${product.priceRegular}</span>
          </div>

          <div className={styles.options}>
            <div className={styles.option}>
              <span>Color:</span>
              <div className={styles.colorOptions}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`${styles.colorOption} ${selectedColor === color ? styles.active : ''}`}
                    title={color}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.option}>
              <span>Capacity:</span>
              <div className={styles.capacityOptions}>
                {product.capacityAvailable.map(capacity => {
                  const capacityInputId = `capacity-${product.id}-${capacity}`;

                  return (
                    <label
                      key={capacity}
                      htmlFor={capacityInputId}
                      className={styles.capacityOption}
                    >
                      <input
                        id={capacityInputId}
                        type="radio"
                        name="capacity"
                        value={capacity}
                        checked={selectedCapacity === capacity}
                        onChange={e => setSelectedCapacity(e.target.value)}
                      />
                      <span>{capacity}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              className={`${styles.favoriteButton} ${product && isFavorite(product.id) ? styles.active : ''}`}
              onClick={handleToggleFavorite}
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.productDetails}>
        <div className={styles.about}>
          <h2>About</h2>
          {product.description.map((desc, index) => (
            <div key={index}>
              <h3>{desc.title}</h3>
              {desc.text.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2>Tech specs</h2>
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
            <div className={styles.spec}>
              <span className={styles.specName}>Camera</span>
              <span className={styles.specValue}>{product.camera}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>Zoom</span>
              <span className={styles.specValue}>{product.zoom}</span>
            </div>
            <div className={styles.spec}>
              <span className={styles.specName}>Cell</span>
              <span className={styles.specValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              className={`${styles.favoriteButton} ${product && isFavorite(product.id) ? styles.active : ''}`}
              onClick={handleToggleFavorite}
            >
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.suggestedProducts}>
        <h2>You may also like</h2>
        <div className={styles.suggestedGrid}>
          {suggestedProducts.map(suggestedProduct => (
            <ProductCard key={suggestedProduct.id} product={suggestedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};
