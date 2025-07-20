import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Location, NavigateFunction } from 'react-router-dom';
import type { DetailedProduct } from '../types/detailedProduct';
import { fetchDetailedProductVariants } from '../utils/fetchProducts';
import { findProductVariant } from '../utils/productHelpers';
import { parseProductUrl } from '../utils/productUrlParser';

interface UseDetailedProductParams {
  category?: string;
  itemId?: string;
  searchParams: URLSearchParams;
  navigate: NavigateFunction;
  location: Location;
}

export const useDetailedProduct = ({
  category,
  itemId,
  searchParams,
  navigate,
  location,
}: UseDetailedProductParams) => {
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [allProductVariants, setAllProductVariants] = useState<
    DetailedProduct[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productNotFound, setProductNotFound] = useState(false);

  const {
    effectiveNamespaceId: currentEffectiveNamespaceId,
    initialSelectedCapacity: currentSelectedCapacityFromUrl,
    initialSelectedColor: currentSelectedColorFromUrl,
  } = useMemo(
    () => parseProductUrl(itemId ?? '', searchParams),
    [itemId, searchParams],
  );

  const updateProductUrl = useCallback(
    (newColor: string, newCapacity: string) => {
      const namespace = currentEffectiveNamespaceId;
      if (!namespace || !category) return;

      let newId = namespace;

      if (
        newCapacity &&
        newCapacity.toLowerCase() !== '0gb' &&
        newCapacity.trim() !== ''
      ) {
        newId += `-${newCapacity.toLowerCase()}`;
      }

      if (newColor && newColor.trim() !== '') {
        newId += `-${newColor.toLowerCase()}`;
      }

      const newPath = `/${category}/${newId}`;
      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true, state: location.state });
      }
    },
    [
      navigate,
      category,
      currentEffectiveNamespaceId,
      location.pathname,
      location.state,
    ],
  );

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      setProductNotFound(false);
      setProduct(null);
      setAllProductVariants([]);

      if (!category || !currentEffectiveNamespaceId) {
        if (active) {
          setProductNotFound(true);
          setLoading(false);
        }
        return;
      }

      try {
        const variants = await fetchDetailedProductVariants(
          category,
          currentEffectiveNamespaceId,
        );
        if (active) {
          if (!variants || variants.length === 0) {
            setProductNotFound(true);
          } else {
            setAllProductVariants(variants);
          }
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          console.error('Error fetching product data:', err);
          setError(
            err instanceof Error ?
              `Failed to load data: ${err.message}`
            : 'Failed to load product data. Please try again later.',
          );
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, [category, currentEffectiveNamespaceId]);

  useEffect(() => {
    if (loading || error) return;

    if (allProductVariants.length === 0) {
      if (!productNotFound) {
        setProduct(null);
      }
      return;
    }

    let selectedVariant = findProductVariant(
      allProductVariants,
      currentSelectedColorFromUrl,
      currentSelectedCapacityFromUrl,
    );

    if (!selectedVariant) {
      selectedVariant =
        allProductVariants.find(
          (p) =>
            (p.color?.toLowerCase() ===
              (currentSelectedColorFromUrl || '').toLowerCase() ||
              !currentSelectedColorFromUrl) &&
            (p.capacity?.toLowerCase() === '0gb' || p.capacity?.trim() === ''),
        ) || allProductVariants[0];
    }

    if (!selectedVariant) {
      setProductNotFound(true);
      setProduct(null);
    } else {
      setProduct(selectedVariant);
      setProductNotFound(false);
    }
  }, [
    allProductVariants,
    currentSelectedCapacityFromUrl,
    currentSelectedColorFromUrl,
    loading,
    error,
    productNotFound,
  ]);

  return {
    product,
    loading,
    error,
    productNotFound,
    updateProductUrl,
    currentSelectedColorFromUrl,
    currentSelectedCapacityFromUrl,
  };
};
