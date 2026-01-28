/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type Swiper from 'swiper';

import { getProducts, getProductDetails } from '../../api/api';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { BigSwiper } from '../../components/BigSwiper/BigSwiper';
import { ThumbsSwiper } from '../../components/ThumbsSwiper/ThumbsSwiper';
import { ProductControl } from '../../components/ProductControl/ProductControl';
import { AboutProduct } from '../../components/AboutProduct/AboutProduct';
// eslint-disable-next-line max-len
import { TechSpecsProduct } from '../../components/TechSpecsProduct/TechSpecsProduct';
import { AlsoLike } from '../../components/AlsoLike/AlsoLike';

import type { Product } from '../../types/Product';
import type { TypesOfProducts } from '../../types/TypesOfProducts';
import styles from './ProductDetailsPage.module.scss';
import { BackButton } from '../../components/BackButton/BackButton';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState<TypesOfProducts | null>(
    null,
  );
  const [productFromList, setProductFromList] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

  // Получаем Product из полного списка по itemId
  const fetchProductFromList = async (itemId: string) => {
    const allProducts = await getProducts();

    return allProducts.find(p => p.itemId === itemId) || null;
  };

  useEffect(() => {
    if (!productId) {
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        setProductDetails(null);
        setProductFromList(null);
        setThumbsSwiper(null);

        // Находим продукт в общем списке
        const productListItem = await fetchProductFromList(productId);

        if (!productListItem) {
          setError('Product not found');

          return;
        }

        setProductFromList(productListItem);

        const details = await getProductDetails(productId);

        if (!details) {
          setError('Product details not found');

          return;
        }

        setProductDetails(details);
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!productDetails) {
      return;
    }

    const normalizedColor = color.toLowerCase().replaceAll(' ', '-');
    const newId = `${productDetails.namespaceId}-${productDetails.capacity.toLowerCase()}-${normalizedColor}`;

    navigate(`/product/${newId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!productDetails) {
      return;
    }

    const newId = `${productDetails.namespaceId}-${capacity.toLowerCase()}-${productDetails.color.replaceAll(' ', '-')}`;

    navigate(`/product/${newId}`);
  };

  return (
    <div className={`${styles.main} ${styles.container}`}>
      {loading && <Loader />}
      {error && <p className={styles.main__errorTitle}>{error}</p>}
      {!loading && !error && !productDetails && (
        <p className={styles.main__errorTitle}>Product not found</p>
      )}

      {!loading && !error && productDetails && productFromList && (
        <>
          <div className={styles.main__breadcrumbs}>
            <Breadcrumbs product={productDetails} />
          </div>

          <div className={styles.main__buttonBack}>
            <BackButton />
          </div>

          <h1 className={styles.main__title}>{productDetails.name}</h1>

          <section className={styles.hero}>
            <div className={styles.hero__bigSwiper}>
              <BigSwiper
                images={productDetails.images}
                thumbsSwiper={thumbsSwiper}
              />
            </div>

            <div className={styles.hero__thumbsSwiper}>
              <ThumbsSwiper
                images={productDetails.images}
                onSwiper={setThumbsSwiper}
              />
            </div>

            <div className={styles.hero__control}>
              <span className={styles.hero__control__id}>
                ID: {productFromList.id}
              </span>

              <div className={styles.hero__control__menu}>
                <ProductControl
                  product={productFromList}
                  productWithDetails={productDetails}
                  onColorChange={handleColorChange}
                  onCapacityChange={handleCapacityChange}
                />
              </div>
            </div>
          </section>

          <section className={styles.main__description}>
            <div className={styles.main__descriptionAbout}>
              <AboutProduct product={productDetails} />
            </div>

            <div className={styles.main__descriptionTechSpecs}>
              <TechSpecsProduct product={productDetails} />
            </div>
          </section>

          <section className={styles.main__alsoLike}>
            <AlsoLike />
          </section>
        </>
      )}
    </div>
  );
};
