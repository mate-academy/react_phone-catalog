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

export const ProductDetailsPage: React.FC = () => {
  const { category, id } = useParams<{
    category: string;
    id: string;
  }>();

  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [suggested, setSuggested] = useState<CarouselProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setHasError(false);

    Promise.all([getProductById(id), getProducts()])
      .then(([productData, allProducts]) => {
        setProduct(productData);

        const mappedForCarousel: CarouselProduct[] = allProducts
          .filter((p: Product) => p.itemId !== id)
          .slice(0, 10)
          .map((p: Product) => ({
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, category]);

  if (isLoading) {
    return (
      <div className={styles['product-details-page__loader-container']}>
        <Loader />
      </div>
    );
  }

  if (hasError || !product) {
    return (
      <h2 className={styles['product-details-page__error-text']}>
        Product not found
      </h2>
    );
  }

  return (
    <div className={styles['product-details-page']}>
      <Breadcrumbs category={category} productName={product?.name} />
      <button
        onClick={() => navigate(-1)}
        className={styles['product-details-page__back-link']}
      >
        <img
          src="/public/img/icons/arrow-to-left.svg"
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
