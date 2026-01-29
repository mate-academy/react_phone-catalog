import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { Phone } from '../../types/Phone';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { getProductColor } from '../../constants/colors';
/* eslint-disable max-len */
import { SuggestedProductsSlider } from '../../components/SuggestedProductsSlider';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Phone | null>(null);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);

        const productsResponse = await fetch('/api/products.json');
        const allProducts: Product[] = await productsResponse.json();
        const productFromList = allProducts.find(p => p.itemId === productId);

        if (!productFromList) {
          setError(true);
          setLoading(false);

          return;
        }

        setProductInfo(productFromList);

        const category = productFromList.category;
        const detailsResponse = await fetch(`/api/${category}.json`);
        const categoryProducts: Phone[] = await detailsResponse.json();
        const detailedProduct = categoryProducts.find(p => p.id === productId);

        if (detailedProduct) {
          setProduct(detailedProduct);
          setSelectedColor(detailedProduct.color);
          setSelectedCapacity(detailedProduct.capacity);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const newProductId = product.id.replace(`-${product.color}`, `-${color}`);

    navigate(`/product/${newProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const currentCapacity = product.capacity.toLowerCase();
    const newCapacity = capacity.toLowerCase();
    const newProductId = product.id.replace(currentCapacity, newCapacity);

    navigate(`/product/${newProductId}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <h1>Product was not found</h1>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          <img
            src="/img/Home_breadcrumb.svg"
            alt="Home"
            className={styles.homeIcon}
          />
        </Link>
        <img src="/img/arrow_right_gray.svg" alt=">" className={styles.arrow} />
        <Link to={`/${product.category}`} className={styles.breadcrumbLink}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <img src="/img/arrow_right_gray.svg" alt=">" className={styles.arrow} />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <img src="/img/arrow_left.svg" alt="Back" />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  selectedImage === index ? styles.thumbnailActive : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={`/${image}`} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={`/${product.images[selectedImage]}`} alt={product.name} />
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>Available colors</p>
            <p className={styles.productId}>ID: {productInfo?.id}</p>
          </div>

          <div className={styles.colors}>
            {product.colorsAvailable.map(color => (
              <button
                key={color}
                className={`${styles.colorButton} ${
                  selectedColor === color ? styles.colorButtonActive : ''
                }`}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: getProductColor(color) }}
              />
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>Select capacity</p>
          </div>

          <div className={styles.capacities}>
            {product.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={`${styles.capacityButton} ${
                  selectedCapacity === capacity
                    ? styles.capacityButtonActive
                    : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.pricing}>
            <div className={styles.prices}>
              <span className={styles.price}>${product.priceDiscount}</span>
              {product.priceDiscount !== product.priceRegular && (
                <span className={styles.oldPrice}>${product.priceRegular}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to cart</button>
              <button className={styles.favorite}>
                <img src="/img/heart.svg" alt="Favorite" />
              </button>
            </div>
          </div>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />

          {product.description.map((section, index) => (
            <div key={index} className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>{section.title}</h3>
              {section.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />

          <div className={styles.techSpecsList}>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>Screen</span>
              <span className={styles.techSpecValue}>{product.screen}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>Resolution</span>
              <span className={styles.techSpecValue}>{product.resolution}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>Processor</span>
              <span className={styles.techSpecValue}>{product.processor}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>RAM</span>
              <span className={styles.techSpecValue}>{product.ram}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>Built in memory</span>
              <span className={styles.techSpecValue}>{product.capacity}</span>
            </div>
            {product.camera && (
              <div className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>Camera</span>
                <span className={styles.techSpecValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>Zoom</span>
                <span className={styles.techSpecValue}>{product.zoom}</span>
              </div>
            )}
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>Cell</span>
              <span className={styles.techSpecValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <SuggestedProductsSlider
        category={product.category as 'phones' | 'tablets' | 'accessories'}
        excludeId={product.id}
      />
    </div>
  );
};
