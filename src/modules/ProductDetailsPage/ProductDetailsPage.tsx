import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '@/shared/context/ProductsContext';
import { useProductDetails } from './hooks';

import { AsyncData } from '@/shared/components/AsyncData';
import { getSuggestedProducts } from '@/utils';
import { getColorHex } from '@/utils';
import { Product } from '@/shared/types';

import { BackHeader, BackHeaderSkeleton } from '@/shared/components/BackHeader';
import { BreadcrumbsNav } from '@/shared/components/BreadcrumbsNav';
import { ProductActions } from '@/shared/components/ProductActions';
import { ProductPrice } from '@/shared/components/ProductPrice';
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton';
import { ProductsSlider } from '@/shared/components/ProductsSlider';
import { ProductSpecsItem } from '@/shared/components/ProductSpecsItem';
import { ImageWithFallback } from '@/shared/components/ImageWithFallback';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { FallbackImg, QuestionImg } from '@/shared/assets/error-img';

import cn from 'classnames';
import './ProductDetailsPage.scss';

const normalizeForUrl = (str: string): string => {
  return str.toLowerCase().trim().replace(/\s+/g, '-');
};

export const ProductDetailsPage = () => {
  //#region Logic
  const { productId, category } = useParams<{
    productId: string;
    category: string;
  }>();

  const { products, loadData } = useProducts();
  const {
    isLoadingDetails,
    hasErrorDetails,
    product,
    loadData: loadDetailsData,
  } = useProductDetails(productId, category);

  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState('');

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImg(product.images[0]);
    }
  }, [product]);

  // control of browser-title
  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} - Nice Gadgets`;
    }

    return () => {
      document.title = 'Nice Gadgets';
    };
  }, [product]);

  const handleColorChange = (newColor: string) => {
    if (!product) {
      return;
    }

    const targetColor = normalizeForUrl(newColor);
    const targetCapacity = normalizeForUrl(product.capacity);

    const selectedProduct = products.find(
      item =>
        item.category === category &&
        item.itemId.includes(product.namespaceId) &&
        item.itemId.endsWith(`-${targetCapacity}-${targetColor}`),
    );

    if (selectedProduct) {
      navigate(`/${category}/${selectedProduct.itemId}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!product) {
      return;
    }

    const targetCapacity = normalizeForUrl(newCapacity);
    const targetColor = normalizeForUrl(product.color);

    const selectedProduct = products.find(
      item =>
        item.category === category &&
        item.itemId.includes(product.namespaceId) &&
        item.itemId.endsWith(`-${targetCapacity}-${targetColor}`),
    );

    if (selectedProduct) {
      navigate(`/${category}/${selectedProduct.itemId}`);
    }
  };

  const currentProduct = products.find(p => p.itemId === productId);

  //#endregion Logic

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Product Details';

  const isAccessories = category === 'accessories';
  const capacityLabel = isAccessories ? 'Select size' : 'Select capacity';
  const memoryLabel = isAccessories ? 'Size' : 'Built in memory';

  return (
    <>
      <div className="product-details container ">
        <div className="product-details__top-bar">
          <BreadcrumbsNav
            isLoading={isLoadingDetails}
            productName={product?.name}
          />
          <ThemeToggle className="product-details__theme-btn" />
        </div>
        {isLoadingDetails ? (
          <>
            <BackHeaderSkeleton className="product-details__header" />
            <ProductDetailsSkeleton />
          </>
        ) : (
          <BackHeader
            catalogTitle={product?.name ?? categoryName}
            className="product-details__header"
          />
        )}

        <AsyncData
          hasError={hasErrorDetails}
          onRetry={loadDetailsData}
          hasData={Boolean(product)}
        >
          <div className="product-details__main">
            <section className="product-details__gallery">
              <div className="product-details__thumbnails">
                {product?.images?.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    className={cn('product-details__thumb', {
                      'product-details__thumb--active': selectedImg === img,
                    })}
                    onClick={() => setSelectedImg(img)}
                  >
                    <ImageWithFallback
                      src={`${import.meta.env.BASE_URL}${img}`}
                      alt={`${product.name} view ${index + 1}`}
                      fallbackIcon={
                        <QuestionImg
                          className="
                            product-details__placeholder-icon
                          "
                        />
                      }
                    />
                  </button>
                ))}
              </div>

              <div className="product-details__main-image">
                <ImageWithFallback
                  className="product-details__main-image-content"
                  src={
                    selectedImg
                      ? `${import.meta.env.BASE_URL}${selectedImg}`
                      : ''
                  }
                  alt={product?.name}
                  fallbackIcon={
                    <FallbackImg
                      className="
                        product-details__placeholder-icon
                      "
                    />
                  }
                />
              </div>
            </section>

            {/* Colors */}
            <section className="product-details__actions">
              <div className="product-details__colors">
                <div className="product-details__wrapper-label">
                  <span className="product-details__label">
                    Available colors
                  </span>
                  <span className="product-details__id-product">
                    ID: {currentProduct?.id}
                  </span>
                </div>
                <div className="product-details__color-list">
                  {product?.colorsAvailable.map(color => {
                    const isSelected = product.color === color;

                    return (
                      <button
                        key={color}
                        type="button"
                        className={cn('product-details__color-btn', {
                          'product-details__color-btn--active': isSelected,
                        })}
                        style={{ background: getColorHex(color) }}
                        onClick={() => handleColorChange(color)}
                        aria-label={color}
                        title={color}
                      ></button>
                    );
                  })}
                </div>
              </div>
              <div className="product-details__inner">
                {/* Capacity */}
                <div className="product-details__capacity">
                  <span className="product-details__label">
                    {capacityLabel}
                  </span>
                  <div className="product-details__capacity-list">
                    {product?.capacityAvailable.map(capacity => {
                      const isSelected = product.capacity === capacity;

                      return (
                        <button
                          key={capacity}
                          type="button"
                          className={cn('product-details__capacity-btn', {
                            'product-details__capacity-btn--active': isSelected,
                          })}
                          onClick={() => handleCapacityChange(capacity)}
                          aria-label={capacity}
                        >
                          {capacity}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <ProductPrice
                  className="product-details__price-block"
                  price={product?.priceDiscount ?? 0}
                  fullPrice={product?.priceRegular ?? 0}
                />

                {/* Buttons */}
                {currentProduct && (
                  <ProductActions
                    product={currentProduct as Product}
                    className="product-details__buttons"
                  />
                )}

                {/* Spec */}
                <dl className="product-details__specs-summary">
                  <ProductSpecsItem
                    label="Screen"
                    value={product?.screen}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Resolution"
                    value={product?.resolution}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Processor"
                    value={product?.processor}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="RAM"
                    value={product?.ram}
                    className="product-details__specs-item"
                  />
                </dl>
              </div>
            </section>

            {/* Down Block: About - Spec */}
            <div className="product-details__info">
              <section className="product-details__about">
                <h2 className="product-details__section-title">About</h2>

                {product?.description.map(({ title, text }, idx) => (
                  <article className="product-details__description" key={idx}>
                    <h3 className="product-details__description-title">
                      {title}
                    </h3>
                    {text.map((paragraph, pIdx) => (
                      <p
                        className="product-details__description-text"
                        key={pIdx}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </article>
                ))}
              </section>

              {/* Full Spec */}
              <section className="product-details__tech-specs">
                <h2 className="product-details__section-title">Tech specs</h2>

                <dl className="product-details__specs-list">
                  <ProductSpecsItem
                    label="Screen"
                    value={product?.screen}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Resolution"
                    value={product?.resolution}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Processor"
                    value={product?.processor}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="RAM"
                    value={product?.ram}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label={memoryLabel}
                    value={product?.capacity}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Camera"
                    value={product?.camera}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Zoom"
                    value={product?.zoom}
                    className="product-details__specs-item"
                  />
                  <ProductSpecsItem
                    label="Cell"
                    value={product?.cell.join(', ')}
                    className="product-details__specs-item"
                  />
                </dl>
              </section>
            </div>
          </div>
        </AsyncData>
      </div>

      <ProductsSlider
        className="product-details__recommended"
        title="You may also like"
        products={product ? getSuggestedProducts(products, product.id) : []}
        onRetry={loadData}
      />
    </>
  );
};
