import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProducts,
  getProductDetails,
  getSuggestedProducts,
} from '../../shared/api/products';
import type {
  Product,
  ProductDetails,
  ProductCategory,
} from '../../shared/types/Product';

const CATEGORIES: ProductCategory[] = ['phones', 'tablets', 'accessories'];

export function useProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const fetchAllProducts = useCallback(async () => {
    try {
      const data = await getProducts();

      setAllProducts(data);
    } catch {
      // Ignore error for suggested products
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const fetchDetails = useCallback(async () => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let foundDetails: ProductDetails | undefined;

      for (const category of CATEGORIES) {
        const result = await getProductDetails(category, productId);

        if (result) {
          foundDetails = result;
          break;
        }
      }

      if (foundDetails) {
        setDetails(foundDetails);
      } else {
        setError('Product was not found');
      }
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const fetchSuggested = useCallback(async () => {
    try {
      const suggested = await getSuggestedProducts(4);

      setSuggestedProducts(suggested);
    } catch {
      // Ignore error
    }
  }, []);

  useEffect(() => {
    fetchSuggested();
  }, [fetchSuggested]);

  const findProductByItemId = useCallback(
    (itemId: string): Product | undefined => {
      return allProducts.find(p => p.itemId === itemId);
    },
    [allProducts],
  );

  const handleColorChange = useCallback(
    (color: string) => {
      if (!details) {
        return;
      }

      const namespaceId = details.namespaceId;
      const capacity = details.capacity;
      const newItemId = `${namespaceId}-${capacity.toLowerCase()}-${color}`;

      navigate(`/product/${newItemId}`, { replace: true });
    },
    [details, navigate],
  );

  const handleCapacityChange = useCallback(
    (capacity: string) => {
      if (!details) {
        return;
      }

      const namespaceId = details.namespaceId;
      const color = details.color;
      const newItemId = `${namespaceId}-${capacity.toLowerCase()}-${color}`;

      navigate(`/product/${newItemId}`, { replace: true });
    },
    [details, navigate],
  );

  const currentColor = details?.color || '';
  const currentCapacity = details?.capacity || '';

  return {
    details,
    loading,
    error,
    suggestedProducts,
    allProducts,
    findProductByItemId,
    currentColor,
    currentCapacity,
    handleColorChange,
    handleCapacityChange,
    goBack: () => navigate(-1),
  };
}
