import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from 'types/ProductInfo';
import styles from './CardDetails.module.scss';
import { useMyContext } from 'components/Contexts/Contexts';
import { Loader } from 'components/Loader/Loader';
import NotFound from 'components/NotFound/NotFound';
import { useCategory } from 'components/Contexts/CategoryContext';
import { getProductsByCategory, getProductById } from 'fetch/fetchProducts';
import { Colors } from 'components/utils/Colors';
import Buttons from 'components/Buttons/Buttons';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Arrow from 'assets/icons/arrow-left.svg';
import AlsoLike from 'components/AlsoLike/AlsoLike';

const CardDetails: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [localLoading, setLocalLoading] = useState(true);
  const { isError, setIsError } = useMyContext();
  const { currentCategory } = useCategory();
  const [mainImage, setMainImage] = useState('');

  const productSpecs = [
    { label: 'Screen', value: product?.screen },
    { label: 'Resolution', value: product?.resolution },
    { label: 'Processor', value: product?.processor },
    { label: 'RAM', value: product?.ram },
  ];

  const fullSpecs = () => {
    const baseSpecs = [
      ...productSpecs.filter(spec => spec.value),
      { label: 'Built in memory', value: product?.capacity },
    ];

    if (product?.camera) {
      baseSpecs.push({ label: 'Camera', value: product.camera });
    }

    if (product?.zoom) {
      baseSpecs.push({ label: 'Zoom', value: product.zoom });
    }

    if (product?.cell && product.cell.length > 0) {
      baseSpecs.push({ label: 'Cell', value: product.cell.join(', ') });
    }

    return baseSpecs.filter(spec => spec.value);
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (currentCategory) {
        try {
          const products = await getProductsByCategory(currentCategory);
          setCategoryProducts(products);
        } catch (e) {
          console.error('Error loading category products:', e);
        }
      }
    };

    fetchCategoryProducts();
  }, [currentCategory]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          setLocalLoading(true);

          const existingProduct = categoryProducts.find(
            p => p.id === productId,
          );

          if (existingProduct) {
            setProduct(existingProduct);
            setLocalLoading(false);
            return;
          }

          const productData = await getProductById(productId);
          if (productData) {
            setProduct(productData);
          } else {
            setIsError(true);
          }
        } catch (e) {
          setIsError(true);
          console.error('Error loading product:', e);
        } finally {
          setLocalLoading(false);
        }
      }
    };

    fetchProduct();
  }, [productId, categoryProducts, setIsError]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const findProductByColor = (color: string): Product | undefined => {
    if (!product) return undefined;

    return categoryProducts.find(
      categoryProduct =>
        categoryProduct.namespaceId === product.namespaceId &&
        categoryProduct.color === color &&
        categoryProduct.capacity === product.capacity,
    );
  };

  const findProductByCapacity = (capacity: string): Product | undefined => {
    if (!product) return undefined;

    return categoryProducts.find(
      categoryProduct =>
        categoryProduct.namespaceId === product.namespaceId &&
        categoryProduct.capacity === capacity &&
        categoryProduct.color === product.color,
    );
  };

  const handleColorChange = (color: string) => {
    const newProduct = findProductByColor(color);
    if (!newProduct) return;

    setProduct(newProduct);
    if (newProduct.images && newProduct.images.length > 0) {
      setMainImage(newProduct.images[0]);
    }

    if (currentCategory) {
      navigate(`/${currentCategory}/${newProduct.id}`);
    } else {
      navigate(`/phones/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const newProduct = findProductByCapacity(capacity);
    if (!newProduct) return;

    setProduct(newProduct);
    if (newProduct.images && newProduct.images.length > 0) {
      setMainImage(newProduct.images[0]);
    }

    if (currentCategory) {
      navigate(`/${currentCategory}/${newProduct.id}`);
    } else {
      navigate(`/phones/${newProduct.id}`);
    }
  };

  if (localLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className={styles.CardDetails}>
      <Breadcrumbs
        category={currentCategory || 'null'}
        productName={product.name}
      />
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img className={styles.backIcon} src={Arrow} alt="back" /> Back
      </button>
      <h2 className={styles.title}>{product.name}</h2>

      <div className={styles.main_content}>
        <div className={styles.left_column}>
          <div className={styles.thumbnails_column}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  image === mainImage ? styles.thumbnailActive : ''
                }`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.center_column}>
          <div className={styles.main_image_wrapper}>
            <img
              src={mainImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.mobile_thumbnails}>
            <div className={styles.min_gallery}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    image === mainImage ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => setMainImage(image)}
                  aria-label={`View ${product.name} image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className={styles.thumbnailImage}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.right_column}>
          <div className={styles.selector}>
            <div className={styles.selector_header}>
              <span className={styles.selector_title}>Available colors</span>
              <span className={styles.selector_id}>
                ID: {product.namespaceId}
              </span>
            </div>
          </div>

          <div className={styles.color_selector}>
            {product.colorsAvailable?.map(color => (
              <label key={color} className={styles.color_label}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="color"
                  value={color}
                  checked={product.color === color}
                  onChange={() => handleColorChange(color)}
                  aria-label={`Select ${color} color`}
                />
                <span
                  className={`${styles.colorCircle} ${
                    product.color === color ? styles.colorCircleActive : ''
                  }`}
                  style={{ backgroundColor: Colors[color] || 'transparent' }}
                ></span>
              </label>
            ))}
          </div>

          <div className={styles.horizontal}></div>

          <div className={styles.selector}>
            <span className={styles.selector_title}>Select capacity</span>
          </div>

          <div className={styles.capacity_selector}>
            {product.capacityAvailable?.map(capacity => (
              <label key={capacity} className={styles.capacity_label}>
                <input
                  className={styles.capacity_radio}
                  type="radio"
                  name="capacity"
                  value={capacity}
                  checked={product.capacity === capacity}
                  onChange={() => handleCapacityChange(capacity)}
                  aria-label={`Select ${capacity} capacity`}
                />
                <span
                  className={`${styles.capacity_button} ${
                    product.capacity === capacity
                      ? styles.capacity_button_active
                      : ''
                  }`}
                >
                  {capacity}
                </span>
              </label>
            ))}
          </div>

          <div className={styles.horizontal}></div>

          <div className={styles.prices}>
            <span className={styles.price}>${product.priceRegular}</span>
            <Buttons product={product} size="medium" align="left" />
          </div>

          <div className={styles.details}>
            {productSpecs.map((spec, index) => (
              <div key={index} className={styles.detail_row}>
                <span className={styles.detail_label}>{spec.label}</span>
                <span className={styles.detail_value}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.info}>
        <div className={styles.about}>
          <h3 className={styles.desc_header}>About</h3>
          <div className={styles.horizontal}></div>
          <div>
            {product.description?.map(desc => (
              <div key={desc.title} className={styles.descs}>
                <h4 className={styles.desc_title}>{desc.title}</h4>
                <p className={styles.desc_text}>{desc.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tech}>
          <h3 className={styles.desc_header}>Tech specs</h3>
          <div className={styles.horizontal}></div>
          <div className={styles.full_specs}>
            {fullSpecs().map((spec, index) => (
              <div className={styles.specs} key={index}>
                <span className={styles.spec_label}>{spec.label}</span>
                <span className={styles.spec_value}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product && <AlsoLike currentProduct={product} />}
    </div>
  );
};

export default CardDetails;
