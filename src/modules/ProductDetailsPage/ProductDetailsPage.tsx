import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductsByCategory,
  getSuggestedProducts,
} from '../../services/services';
import type { Product } from '../../types/Product';
import styles from './ProductDetailsPage.module.scss';
import type { ProductCategories } from '../../types/ProductCategories';
import { Loader } from '../shared/components/Loader';
import { ErrorLoading } from '../ProductPage/components/ErrorLoading';
import { AddActions } from '../shared/components/AddActions';
import {
  PRODUCT_SPECIFICATIONS,
  PRODUCT_SPECIFICATIONS_TECH,
} from '../../constants';
import { Specifications } from '../shared/components/Specifications';
import { Prices } from '../shared/components/Prices';
import { AboutProduct } from './components/AboutProduct/AboutProduct';
import { CardSlider } from '../shared/components/CardSlider';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { NotFoundProductPage } from './components/NotFoundProductPage';
import { Gallery } from './components/Gallery/Gallery';
import { ButtonBack } from '../shared/components/ButtonBack';
import { ColorPanel } from './components/ColorPanel';
import { CapacityPanel } from './components/CapacityPanel';

export const ProductDetailsPage: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  const currentCategory = category as ProductCategories;

  const loadProduct = useCallback(() => {
    if (!id || !currentCategory) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(currentCategory)
      .then(products => {
        setCategoryProducts(products);
        const foundProduct = products.find(
          currProduct => currProduct.id === id,
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.images[0] || '');
          setSelectedColor(foundProduct.color || '');
          setSelectedCapacity(foundProduct.capacity || '');
        } else {
          setProduct(null);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [id, currentCategory]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    getSuggestedProducts(10).then(data => setSuggestedProducts(data));
  }, []);

  const findProduct = (
    color: string,
    capacity: string,
  ): Product | undefined => {
    if (!product) {
      return undefined;
    }

    return categoryProducts.find(
      currProduct =>
        currProduct.namespaceId === product.namespaceId &&
        currProduct.color.toLowerCase() === color.toLowerCase() &&
        currProduct.capacity.toLowerCase() === capacity.toLowerCase(),
    );
  };

  const handleColorChange = (newColor: string) => {
    if (!product || newColor === selectedColor) {
      return;
    }

    const targetProduct = findProduct(newColor, selectedCapacity);

    if (targetProduct) {
      navigate(`/${category}/${targetProduct.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!product || newCapacity === selectedCapacity) {
      return;
    }

    const targetProduct = findProduct(selectedColor, newCapacity);

    if (targetProduct) {
      navigate(`/${category}/${targetProduct.id}`);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <ErrorLoading reloadAction={loadProduct} />;
  }

  if (!product) {
    return <NotFoundProductPage />;
  }

  const {
    name,
    images = [],
    priceRegular,
    priceDiscount,
    capacityAvailable = [],
    description = [],
  } = product;

  const currentImage = selectedImage || images[0];

  return (
    <>
      <Breadcrumbs productName={product.name} />

      <div className={styles['product-details']}>
        <ButtonBack />

        <h1 className={styles.title}>{name}</h1>

        <div className={styles['details-top']}>
          <div className={styles['details-top-left']}>
            <Gallery
              images={images}
              currentImage={currentImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          <div className={styles['details-top-right']}>
            <ColorPanel
              product={product}
              selectedColor={selectedColor}
              selectedCapacity={selectedCapacity}
              handleColorChange={handleColorChange}
              findProduct={findProduct}
            />

            <div className={styles.divider} />

            <CapacityPanel
              selectedCapacity={selectedCapacity}
              selectedColor={selectedColor}
              capacityAvailable={capacityAvailable}
              findProduct={findProduct}
              handleCapacityChange={handleCapacityChange}
            />

            <Prices
              priceDiscount={priceDiscount}
              priceRegular={priceRegular}
              classname={styles.prices}
            />
            <AddActions product={product} classname={styles.actions} />
            <Specifications list={PRODUCT_SPECIFICATIONS} product={product} />
          </div>
        </div>

        <div className={styles['details-bottom']}>
          <div className={styles['details-bottom-left']}>
            <AboutProduct description={description} />
          </div>

          <div className={styles['details-bottom-right']}>
            <Specifications
              list={PRODUCT_SPECIFICATIONS_TECH}
              product={product}
              title={'Tech specs'}
              classnames={{
                specificationsPanel: styles['specifications-panel'],
                specifications: styles.specifications,
              }}
            />
          </div>
        </div>

        <div className={styles['suggested-products']}>
          {suggestedProducts && (
            <CardSlider
              products={suggestedProducts}
              title={'You may also like'}
            />
          )}
        </div>
      </div>
    </>
  );
};
