import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductDetails.module.scss';
import { Product } from '../../types/Product';
import { getProductById, getSuggestedProducts } from '../../api/products';
import './ProductDetails.module.scss';

// A small reusable component for radio options.
interface RadioOptionProps {
  name: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const RadioOptions: React.FC<RadioOptionProps> = ({
  name,
  options,
  selected,
  onChange,
}) => {
  return (
    <div className={styles.radioGroup}>
      {options.map(option => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={selected === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Fetch product details on mount based on productId.
  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    getProductById(productId)
      .then((data: Product | null) => {
        if (data) {
          setProduct(data);
          // Initialize selections
          if (data.colorsAvailable && data.colorsAvailable.length > 0) {
            setSelectedColor(data.colorsAvailable[0]);
          }

          if (data.capacityAvailable && data.capacityAvailable.length > 0) {
            setSelectedCapacity(data.capacityAvailable[0]);
          }

          if (data.image && data.image.length > 0) {
            setSelectedImage(data.image[0]);
          }

          // Fetch suggested products (randomly chosen)
          getSuggestedProducts(data.id).then(setSuggestedProducts);
        } else {
          setError('Product was not found.');
        }

        setLoading(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error(err);
        setError('An error occurred while fetching product details.');
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <p>{error || 'Product was not found.'}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  // Determine the category link used in Breadcrumbs.
  let categoryLink = '/';

  if (product.category.toLowerCase() === 'phones') {
    categoryLink = '/phones';
  } else if (product.category.toLowerCase() === 'tablets') {
    categoryLink = '/tablets';
  } else if (product.category.toLowerCase() === 'accessories') {
    categoryLink = '/accessories';
  }

  return (
    <div className={styles.productDetails}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/">Home</Link> &gt;{' '}
        <Link to={categoryLink}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>{' '}
        &gt; <span>{product.name}</span>
      </nav>

      {/* Back button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Main details */}
      <div className={styles.detailsContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img src={selectedImage} alt={product.name} />
          </div>
          {product.image && product.image.length > 1 && (
            <div className={styles.thumbnailGallery}>
              {product.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={
                    img === selectedImage ? styles.activeThumbnail : ''
                  }
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.infoSection}>
          <h1>{product.name}</h1>
          <p>
            <strong>Price:</strong> ${product.price}{' '}
            <span className={styles.fullPrice}>${product.fullPrice}</span>
          </p>
          <p>
            <strong>Tech Specs:</strong> {product.screen} | {product.ram} |{' '}
            {product.processor || 'N/A'}
          </p>

          {/* Colors selection */}
          {product.colorsAvailable && product.colorsAvailable.length > 0 && (
            <div className={styles.options}>
              <h3>Available Colors:</h3>
              <RadioOptions
                name="colors"
                options={product.colorsAvailable}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>
          )}

          {/* Capacities selection */}
          {product.capacityAvailable &&
            /* eslint-disable @typescript-eslint/indent */
            product.capacityAvailable.length > 0 && (
              // eslint-disable-next-line indent
              // /* eslint-disable @typescript-eslint/indent */
              /* eslint-disable react/jsx-indent */
              <div className={styles.options}>
                <h3>Available Capacities:</h3>
                <RadioOptions
                  name="capacities"
                  options={product.capacityAvailable}
                  selected={selectedCapacity}
                  onChange={setSelectedCapacity}
                />
              </div>
            )}

          {/* About Section */}
          <section className={styles.about}>
            <h2>About</h2>
            {product.description.map((desc, index) => (
              <div key={index}>
                <h3>{desc.title}</h3>
                {desc.text.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* "You may also like" block */}
      {suggestedProducts.length > 0 && (
        <section className={styles.suggested}>
          <h2>You may also like</h2>
          <div className={styles.suggestedProducts}>
            {suggestedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
