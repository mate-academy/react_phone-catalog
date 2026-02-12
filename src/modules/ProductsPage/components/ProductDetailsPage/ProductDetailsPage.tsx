/* eslint-disable prettier/prettier */
// src/components/ProductDetailsPage/ProductDetailsPage.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../../shared/components/Loader/Loader';
import { Product } from '../../../../types/ProductTypes/Product';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import Breadcrumbs from '../../../Breadcrumbs/Breadcrumbs';
import Header from '../../../shared/components/Header/Header';
import AddToCartButton from '../../../HomePage/components/AddToCart/AddToCart';
// eslint-disable-next-line max-len
import AddToFavoritesButton from '../../../HomePage/components/AddToFavorite/AddToFavorite';
import YouMayAlsoLike from './components/YouMayAlsoLike/YouMayAlsoLike';
import styles from './ProductDetailsPage.module.scss';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);

    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const found = data.find(p => p.itemId === productId);

        if (!found) {
          throw new Error('Produto não encontrado em products.json');
        }

        setProduct(found);

        let apiUrl = '';

        if (found.category === 'phones') {
          apiUrl = '/api/phones.json';
        } else if (found.category === 'tablets') {
          apiUrl = '/api/tablets.json';
        } else if (found.category === 'accessories') {
          apiUrl = '/api/accessories.json';
        } else {
          throw new Error('Categoria não reconhecida');
        }

        return fetch(apiUrl).then(res => res.json());
      })
      .then((categoryData: Product[]) => {
        const detailed = categoryData.find(item => item.id === productId);

        if (!detailed) {
          throw new Error('Produto não encontrado na API da categoria');
        }

        setProduct(prev =>
          prev
            ? {
              // eslint-disable-next-line @typescript-eslint/indent
                ...prev,
              ...detailed,
            }
            : detailed,
        );

        const filtered = categoryData.filter(
          p => p.id !== detailed.id && p.category === detailed.category,
        );
        const shuffled = filtered.sort(() => 0.5 - Math.random());

        setSuggestedProducts(shuffled.slice(0, 4));

        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={() => window.location.reload()} />;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const {
    images = [],
    description = [],
    resolution,
    processor,
    zoom,
    cell = [],
    camera,
  } = product;

  const productImages = images.length > 0 ? images : [product.image ?? ''];

  const availableCapacities = product.capacityAvailable ?? [product.capacity];
  const availableColors = product.colorsAvailable ?? [product.color];

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <Breadcrumbs category={product.category} productName={product.name} />

        <Link
          to="#"
          onClick={() => window.history.back()}
          className={styles.goBack}
        >
          ← Back
        </Link>

        <h1 className={styles.productTitle}>{product.name}</h1>

        <div className={styles.productMainInfo}>
          <div className={styles.productImagesColumn}>
            <div className={styles.mainImageContainer}>
              <img
                src={`/${productImages[selectedImageIndex]}`}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.thumbnailGallery}>
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnailItem} ${
                    selectedImageIndex === index ? styles.active : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={`/${image}`} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productDetailsColumn}>
            <div className={styles.availableColors}>
              <p className={styles.sectionLabel}>Available colors</p>
              <div className={styles.colorOptions}>
                {availableColors.map(color => (
                  <div
                    key={color}
                    className={`${styles.colorOption} ${
                      selectedColor === color ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      backgroundColor: color === 'black' ? '#000' : color,
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className={styles.capacitySection}>
              <p className={styles.sectionLabel}>Select capacity</p>
              <div className={styles.capacityOptions}>
                {availableCapacities.map(capacity => (
                  <button
                    key={capacity}
                    className={`${styles.capacityButton} ${
                      selectedCapacity === capacity ? styles.selected : ''
                    }`}
                    onClick={() => setSelectedCapacity(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>${product.price}</span>
              {product.fullPrice && product.fullPrice > product.price && (
                <span className={styles.fullPrice}>${product.fullPrice}</span>
              )}
            </div>

            <div className={styles.actions}>
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  category: product.category,
                  screen: product.screen,
                  capacity: selectedCapacity,
                  color: selectedColor,
                  ram: product.ram,
                  year: product.year,
                  itemId: product.itemId,
                }}
                className={styles.addToCartButton}
              />
              <AddToFavoritesButton productId={product.itemId} />
            </div>

            <div className={styles.shortSpecs}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Screen</span>
                <span className={styles.specValue}>{product.screen}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Resolution</span>
                <span className={styles.specValue}>2688x1242</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Processor</span>
                <span className={styles.specValue}>Apple A12 Bionic</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>RAM</span>
                <span className={styles.specValue}>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.descriptionAndSpecs}>
          <div className={styles.aboutSection}>
            <h2>About</h2>
            {description && description.length > 0 ? (
              description.map((descItem, index) => (
                <div key={index}>
                  <h3>{descItem.title}</h3>
                  {descItem.text.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              ))
            ) : (
              <p>No description available.</p>
            )}
          </div>

          <div className={styles.techSpecsSection}>
            <h2>Tech specs</h2>
            <div className={styles.techSpecsList}>
              <div className={styles.specRow}>
                <span>Screen</span>
                <span>{product.screen}</span>
              </div>
              <div className={styles.specRow}>
                <span>Resolution</span>
                <span>{resolution ?? 'N/A'}</span>
              </div>
              <div className={styles.specRow}>
                <span>Processor</span>
                <span>{processor ?? 'N/A'}</span>
              </div>
              <div className={styles.specRow}>
                <span>RAM</span>
                <span>{product.ram}</span>
              </div>
              <div className={styles.specRow}>
                <span>Camera</span>
                <span>{camera ?? 'N/A'}</span>
              </div>
              <div className={styles.specRow}>
                <span>Zoom</span>
                <span>{zoom ?? 'N/A'}</span>
              </div>
              <div className={styles.specRow}>
                <span>Cell</span>
                <span>{cell.length > 0 ? cell.join(', ') : 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2>You may also like:</h2>
          <div className="ProductBox">
            <div>
              <YouMayAlsoLike />
              <YouMayAlsoLike />
              <YouMayAlsoLike />
              <YouMayAlsoLike />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
