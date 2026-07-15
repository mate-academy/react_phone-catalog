import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../shared/types/ProductDetails';
import { Product } from '../shared/types/Product';
import { SpecItem } from '../shared/components/ShortSpec/types';

export const useItem = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (!productId) {
      return;
    }

    const fetchItem = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const allProductsResponse = await fetch(
          `${import.meta.env.BASE_URL}/api/products.json`,
        );

        if (!allProductsResponse.ok) {
          throw new Error('Internal server error');
        }

        const allProductsData: Product[] = await allProductsResponse.json();

        const otherProducts = allProductsData
          .filter(p => p.itemId !== productId)
          .map(p => ({ ...p, image: `/${p.image}` }));

        const shuffledProducts = [...otherProducts].sort(
          () => 0.5 - Math.random(),
        );

        setSuggestedProducts(shuffledProducts.slice(0, 8));

        const basicProduct = allProductsData.find(
          element => element.itemId === productId,
        );

        if (!basicProduct) {
          throw new Error('Product not found in global index');
        }

        setCategory(basicProduct.category);

        const response = await fetch(
          `${import.meta.env.BASE_URL}/api/${basicProduct.category}.json`,
        );

        if (!response.ok) {
          throw new Error('Internal server error');
        }

        const data: ProductDetails[] = await response.json();

        const foundProduct = data.find(element => element.id === productId);

        if (foundProduct) {
          const preparedProduct = {
            ...foundProduct,
            images: foundProduct.images.map(image => `/${image}`),
          };

          setProduct(preparedProduct);
        } else {
          throw new Error('Item not found');
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [productId]);

  const shortSpecs: SpecItem[] = useMemo(() => {
    if (!product) {
      return [];
    }

    return [
      { key: 'Screen', value: product.screen },
      { key: 'Capacity', value: product.capacity },
      { key: 'RAM', value: product.ram },
    ];
  }, [product]);

  const detailedSpecs: SpecItem[] = useMemo(() => {
    if (!product) {
      return [];
    }

    return [
      { key: 'Screen', value: product.screen },
      { key: 'Resolution', value: product.resolution },
      { key: 'Processor', value: product.processor },
      { key: 'RAM', value: product.ram },
      { key: 'Built in memory', value: product.capacity },
      { key: 'Camera', value: product.camera },
      { key: 'Zoom', value: product.zoom },
      { key: 'Cell', value: product.cell.join(', ') },
    ];
  }, [product]);

  return {
    isError,
    isLoading,
    product,
    category,
    suggestedProducts,
    shortSpecs,
    detailedSpecs,
  };
};
