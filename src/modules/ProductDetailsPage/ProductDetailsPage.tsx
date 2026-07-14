import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExtendedProductCard } from './components/ExtendedProductCard';
import styles from './ProductDetailsPage.module.scss';
import { Carousel } from '../shared/components/Carousel';
import { getProducts, getProductById } from '../shared/utils/api';
import { Loader } from '../shared/components/Loader';
import {
  ProductDetail,
  Product,
  CarouselProduct,
} from '../shared/types/Product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { NotFoundProduct } from '../NotFoundProduct';
import { getSuggestedProducts } from '../shared/utils/getSuggestedProducts';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [suggested, setSuggested] = useState<CarouselProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    Promise.all([getProductById(productId), getProducts()])
      .then(([productData, allProducts]) => {
        setProduct(productData);

        const mappedForCarousel = getSuggestedProducts(
          allProducts,
          productId,
        ).map((p: Product) => ({
          id: p.itemId,
          img: p.image,
          name: p.name,
          category: p.category,
          capacity: p.capacity,
          priceRegular: p.fullPrice,
          priceDiscount: p.price,
          ram: p.ram,
          screen: p.screen,
        }));

        setSuggested(mappedForCarousel);
      })
      .catch(() => {
        setHasError(true);
        setProduct(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <div className={styles['product-details-page__loader-container']}>
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.error}>
        <h2>Something went wrong</h2>

        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!product) {
    return <NotFoundProduct />;
  }

  return (
    <div className={styles['product-details-page']}>
      <Breadcrumbs category={product?.category} productName={product?.name} />
      <button
        onClick={() => navigate(`/${product.category}`)}
        className={styles['product-details-page__back-link']}
      >
        <img
          src={`${import.meta.env.BASE_URL}img/icons/arrow-to-left.svg`}
          alt="Arrow to left"
          className={styles['product-details-page__back-icon']}
        />
        Back
      </button>

      <div style={{ opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
        {product && <ExtendedProductCard {...product} />}
      </div>
      {isLoading && <Loader />}
      <Carousel title="You may also like" cards={suggested} />
    </div>
  );
};
