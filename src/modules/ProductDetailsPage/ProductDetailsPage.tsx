/* eslint-disable jsx-a11y/label-has-associated-control */

import { ChangeEvent, useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product, ProductDetails } from '../shared/types';
import { getProducts } from './utils/api';
import { useProducts } from '../shared/context/productsContext';
import Loader from '../shared/components/Loader';
import PhotoSlider from './components/PhotoSlider';
import classNames from 'classnames';
import Breadcrumbs from '../shared/components/Breadcrumbs';
import AboutSection from './components/AboutSection';
import TechSection from './components/TechSection';
import ProductsSlider from '../shared/components/ProductsSlider';
import ProductNotFound from '../shared/components/ProductNotFound';
import { colorReplacementMap } from './utils/colorReplacementMap';
import GoBack from '../shared/components/GoBack';
import Button from '../shared/components/Button';
import IconButton from '../shared/components/IconButton';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { products, isLoading, isError } = useProducts();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [productVariants, setProductVariants] = useState<ProductDetails[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [error, setError] = useState('');
  const [randomProducts, setRandomProducts] = useState<Product[]>(products);
  const pathSegments = pathname.split('/').filter(Boolean);
  const category = pathSegments[0];

  const productItem = products.find(p => p.itemId === productId) as Product;

  useEffect(() => {
    window.scrollTo(0, 0);
    const matchedProduct = productVariants.find(prod => prod.id === productId);

    if (!matchedProduct) {
      setIsProductLoading(true);
      getProducts(category)
        .then(result => {
          const device = result.find(item => item.id === productId) || null;

          setProduct(device);
          if (device) {
            const colorVariants = [...result].filter(
              item => item.namespaceId === device.namespaceId,
            );

            setProductVariants(colorVariants);
          }
        })
        .catch(e => setError(e))
        .finally(() => {
          setIsProductLoading(false);
        });
    }

    setRandomProducts(prev => prev.sort(() => Math.random() - 0.5))
  }, [productId]);

  if (isProductLoading) {
    return <Loader/>
  } else if (!product) {
    return <ProductNotFound currentPath={pathSegments[1].split('-').join(' ')}/>
  }

  const handleChangeProperty = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof ProductDetails,
  ) => {
    const value = e.target.value;

    if (product && value !== product[field]) {
      const availableProduct =
        productVariants.find(variant => {
          if (field === 'color') {
            return (
              variant.color === value && variant.capacity === product.capacity
            );
          }

          return variant[field] === value && variant.color === product.color;
        }) || null;

      setProduct(availableProduct);
      if (availableProduct) {
        navigate(`/${category}/${availableProduct.id}`);
      }
    }
  };

  return (
    <>
      <div className={styles.page}>
        <Breadcrumbs currentProduct={product?.name || ''} />

        <GoBack />

        {error ? (
          <div>{error}</div>
        ) : (
          <>
            <h1 className={styles.page__title}>{product?.name}</h1>
            <PhotoSlider images={product.images} />

            <div className={styles.page__productsDetails}>
              <div className={styles.page__detailsSection}>
                <h5>Available colors</h5>
                <span className={styles.page__productID}>ID: 44444</span>
                <div className={styles.page__options}>
                  {product.colorsAvailable.map(color => (
                    <label
                      key={color}
                      className={classNames(styles.page__color, {
                        [styles.page__color_active]: color === product.color,
                      })}
                      style={{
                        backgroundColor: colorReplacementMap[color] || color,
                      }}
                    >
                      <span></span>
                      <input
                        onChange={e => handleChangeProperty(e, 'color')}
                        defaultChecked={color === product.color}
                        name="color"
                        type="radio"
                        value={color}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.page__detailsSection}>
                <h5 className={styles.page__detailsTitle}>Select capacity</h5>
                <div className={styles.page__options}>
                  {product.capacityAvailable.map(capacity => (
                    <label
                      key={capacity}
                      className={classNames(styles.page__capacity, {
                        [styles.page__capacity_active]:
                          capacity === product.capacity,
                      })}
                    >
                      <span>{capacity}</span>
                      <input
                        onChange={e => handleChangeProperty(e, 'capacity')}
                        defaultChecked={capacity === product.capacity}
                        name="capacity"
                        type="radio"
                        value={capacity}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <h3 className={styles.page__price}>
                <span>${product.priceDiscount}</span>
                <span className={styles.page__priceRegular}>
                  ${product.priceRegular}
                </span>
              </h3>

              <div className={styles.page__buttons}>
                <Button item={productItem} isBig={true} />

                <IconButton item={productItem} isBig={true} />
              </div>

              <div className={styles.page__details}>
                <span>Screen</span>
                <span>{product.screen}</span>
              </div>
              <div className={styles.page__details}>
                <span>Resolution</span>
                <span>{product.resolution}</span>
              </div>
              <div className={styles.page__details}>
                <span>Processor</span>
                <span>{product.processor}</span>
              </div>
              <div className={styles.page__details}>
                <span>RAM</span>
                <span>{product.ram}</span>
              </div>
            </div>

            <AboutSection description={product.description} />
            <TechSection product={product} />
          </>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h2>Something went wrong!</h2>
      ) : (
        <ProductsSlider title="You may also like" products={randomProducts} />
      )}
    </>
  );
};

export default ProductDetailsPage;
