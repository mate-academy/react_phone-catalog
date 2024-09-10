import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '../../utils/fetchProducts';

import { PageNotFound } from '../../pages/PageNotFound';
import { ColorSelector } from '../ColorSelector';
import { CapacitySelector } from '../CapacitySelector';
import { ProductActions } from '../ProductActions';
import { ProductPrice } from '../ProductPrice';
import { Specification } from '../Specification';
import { ProductAbout } from '../ProductAbout';
import { ProductSpecs } from '../ProductSpecs';
import { BreadCrumbs } from '../BreadCrumbs';
import { BackButton } from '../BackButton/BackButton';
import { ProductSlider } from '../ProductSlider';
import { Loader } from '../Loader';

import { Product } from '../../types/Product';
import { Category } from '../../types/CategoryTypes';
import { Item } from '../../types/Item';

import styles from './ItemCard.module.scss';
import { TransitionMask } from '../TransitionMask/TransitionMask';
const {
  card,
  card__content,
  card__top,
  card__title,
  card__imgBlock,
  card__img,
  card__previews,
  card__sliderBlock,
  card__sliderBlockIsActive,
  card__sliderImg,
  card__controls,
  card__actions,
  card__price,
  card__specs,
} = styles;

type Params = {
  category: Category;
  itemPage: string;
};

export const ItemCard = () => {
  const { category, itemPage } = useParams<Params>();

  // Getting a state passed from the product to check of there is a discount on the product
  const { state: itemWithDiscount } = useLocation();

  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [targetImgIndex, setTargetImgIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch all item options for the current category
  const {
    data: itemOptions,
    isLoading: isItemOptionsLoading,
    error: itemOptionsError,
  } = useQuery<Item[], Error>({
    queryKey: ['models', category, itemPage],
    queryFn: async () => {
      if (!category || !itemPage) return [];

      // Defining a modelPrefix aka namespaceID to reduce a number of saved itemOptions
      const modelPrefix =
        category === 'phones'
          ? itemPage.split('-').slice(0, -2).join('-')
          : category === 'tablets'
            ? itemPage.split('-').slice(0, -2).join('-')
            : category === 'accessories' &&
              itemPage.split('-').slice(0, 4).join('-');

      const response: Item[] = await fetchProducts(`/api/${category}.json`);

      return response.filter((item) => item.namespaceId === modelPrefix);
    },
  });

  const productQueryKey = useMemo(() => ['products', itemPage], [itemPage]);

  // Fetch the products
  const {
    data: productOptions,
    isLoading: isProductOptionsLoading,
    error: productOptionsError,
  } = useQuery<Product[], Error>({
    queryKey: productQueryKey,
    queryFn: async () => {
      const products: Product[] = await fetchProducts(`/api/products.json`);

      return products;
    },
    enabled: !!itemPage,
    staleTime: Infinity, // Data will never become stale
    gcTime: Infinity,
  });

  // Find the current item from pre-loaded options
  const currentItem = useMemo(() => {
    if (!itemOptions || !itemPage) return null;

    return itemOptions.find((item) => item.id === itemPage) || null;
  }, [itemOptions, itemPage]);

  // Find the current product from pre-loaded options
  const currentProduct = useMemo(() => {
    if (!productOptions || !itemPage) return null;

    return (
      productOptions.find((product) => product.itemId === itemPage) || null
    );
  }, [productOptions, itemPage]);

  useEffect(() => {
    if (currentProduct && currentItem) {
      setIsUpdating(false);
    }
  }, [currentProduct, currentItem]);

  const isLoading = useMemo(
    () => isInitialLoading || isItemOptionsLoading || isProductOptionsLoading,
    [isInitialLoading, isItemOptionsLoading, isProductOptionsLoading],
  );

  const error = useMemo(
    () => itemOptionsError || productOptionsError,
    [itemOptionsError, productOptionsError],
  );

  // Simulate initial loading state for UX purposes
  useEffect(() => {
    if (!isItemOptionsLoading && !isProductOptionsLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isItemOptionsLoading, isProductOptionsLoading]);

  // Handle item variant changes (color, capacity) without page reload
  const handleItemChange = useCallback(
    async (newItemId: string) => {
      setIsUpdating(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (category) {
        navigate(`/catalog/${category}/${newItemId}`, { replace: true });
      }
    },
    [category, navigate],
  );

  const handlePreviewClick = useCallback((index: number) => {
    setTargetImgIndex(index);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (
    !category ||
    !itemPage ||
    !itemOptions ||
    !currentProduct ||
    !currentItem
  ) {
    return <PageNotFound productNotFound />;
  }

  return (
    <TransitionMask isUpdating={isUpdating}>
      <div className={card}>
        <div className={card__content}>
          <div className={card__top}>
            <BreadCrumbs item={currentItem} />

            <BackButton />

            <h2 className={card__title}>{currentItem.name}</h2>

            <div className={card__imgBlock}>
              <img
                src={`/${currentItem.images[targetImgIndex]}`}
                alt={`${currentItem.name} photo`}
                className={card__img}
              />
            </div>

            <div className={card__previews}>
              {currentItem.images.map((photo, index) => (
                <div
                  className={`
                ${card__sliderBlock}
                ${index === targetImgIndex && card__sliderBlockIsActive}`}
                  key={index}
                  onClick={() => handlePreviewClick(index)}
                >
                  <img
                    src={`/${photo}`}
                    alt={`${currentItem.name} photo preview`}
                    className={card__sliderImg}
                  />
                </div>
              ))}
            </div>

            <div className={card__controls}>
              <ColorSelector
                item={currentItem}
                colors={currentItem.colorsAvailable}
                onColorChange={handleItemChange}
                itemOptions={itemOptions}
              />

              <CapacitySelector
                item={currentItem}
                capacityOptions={currentItem.capacityAvailable}
                onCapacityChange={handleItemChange}
                itemOptions={itemOptions}
              />

              <div className={card__actions}>
                <div className={card__price}>
                  <ProductPrice
                    fullPrice={currentProduct.fullPrice}
                    discountedPrice={currentProduct.price}
                    discount={itemWithDiscount}
                    context="page"
                  />
                </div>

                <ProductActions product={currentProduct} />
              </div>

              <div className={card__specs}>
                <Specification
                  label="Screen"
                  value={currentItem.screen}
                  context="page"
                />

                <Specification
                  label="Resolution"
                  value={currentItem.resolution}
                  context="page"
                />

                <Specification
                  label="Processor"
                  value={currentItem.processor}
                  context="page"
                />

                <Specification
                  label="RAM"
                  value={currentItem.ram}
                  context="page"
                />
              </div>
            </div>
          </div>

          <ProductAbout description={currentItem.description} />

          <ProductSpecs product={currentItem} />

          {/* If user gets here to the product with discount - he will 
            see a products with it as recomendations, otherwise - without
          */}
          <ProductSlider
            title="You may also like"
            apiUrl="/api/products.json"
            discount={itemWithDiscount}
            newOnly={false}
            suggestedProducts={true}
          />
        </div>
      </div>
    </TransitionMask>
  );
};
