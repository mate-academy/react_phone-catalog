import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ProductPage.scss';

import { ProductGallery } from '@components/product/ProductGallery/ProductGallery';
import { ProductOptions } from '@components/product/ProductOptions/ProductOptions';
import { ProductPurchase } from '@components/product/ProductPurchase/ProductPurchase';
import { ProductDetail } from '@components/product/ProductDetail';
import { TechSpecs } from '@components/product/TechSpecs/TechSpecs';
import { RelatedProducts } from '@components/product/RelatedProducts/RelatedProducts';
import { ProductFeatures } from '@components/product/ProductFeatures';
import { ReviewsPage } from '@components/product/Reviews/ReviewsPage';

import { ScrollToTop } from '@components/common/ScrollToTop/ScrollToTop';

import { ProductDetails } from '@/types/Product';

type Props = {
  product: ProductDetails;
  onCapacityChange: (newItemId: string) => void;
  onColorChange?: (color: string) => void;
  onCapacitySelect?: (capacity: string) => void;
  showReviews: boolean;
  onCloseReviews: () => void;
};

export const ProductPage: React.FC<Props> = ({
  product,
  onCapacityChange,
  showReviews,
  onCloseReviews,
}) => {
  const location = useLocation();
  const categoryFromUrl = location.pathname.split('/')[1];
  const reviewsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showReviews && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showReviews]);

  return (
    <div className="product-card">
      <ScrollToTop />
      <div className="product-card__gallery">
        <ProductGallery
          images={product.images}
          name={product.name}
        />
      </div>
      <div className="product-card__sidebar">
        <div className="product-card__options">
          <ProductOptions
            key={product.id}
            itemId={product.id}
            namespaceId={product.namespaceId}
            colorsAvailable={product.colorsAvailable}
            currentColor={product.color}
            capacityAvailable={product.capacityAvailable}
            currentCapacity={product.capacity}
            onCapacityChange={onCapacityChange}
          />
          <ProductPurchase
            product={product}
            priceDiscount={product.priceDiscount}
            priceRegular={product.priceRegular}
          />
        </div>
        <div className="product-card__about">
          <ProductFeatures
            screen={product.screen}
            resolution={product.resolution}
            capacity={product.capacity}
            ram={product.ram}
            showTopLine={false}
          />
        </div>
      </div>
      <div className="product-card__description">
        <ProductDetail description={product.description} />
      </div>
      <div className="product-card__tech-specs">
        <TechSpecs
          screen={product.screen}
          resolution={product.resolution}
          processor={product.processor}
          ram={product.ram}
          capacity={product.capacity}
          camera={product.camera}
          zoom={product.zoom}
          cell={product.cell}
        />
      </div>

      {showReviews && (
        <div
          ref={reviewsRef}
          className="product-card__reviews"
        >
          <ReviewsPage
            productId={product.id}
            onBack={onCloseReviews}
          />
        </div>
      )}

      <div className="product-card__related">
        <RelatedProducts
          category={categoryFromUrl}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
};
