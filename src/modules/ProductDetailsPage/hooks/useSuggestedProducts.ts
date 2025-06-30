import { useContext, useMemo } from 'react';
import { ProductContext } from '../../../store/ProductContext';
import { useParams } from 'react-router-dom';
import { adaptedProductList } from '../../../utils/adapters/adaptedProductList';

export const useSuggestedProducts = () => {
  const { products, isDataReady } = useContext(ProductContext);
  const { productId } = useParams();
  const validId = productId ? productId.toString() : '';

  const sortedProducts = useMemo(() => {
    const copyProducts = [...products];

    if (!copyProducts.length || !isDataReady) {
      return [];
    }

    const product = copyProducts.find(p => p.itemId === validId);
    const category = product?.category;
    const findProductCategory = copyProducts.filter(
      prod => prod.category === category,
    );
    const suggestedProducts = findProductCategory.filter(
      prod => prod.itemId !== validId,
    );
    const sorted = suggestedProducts.sort(() => 0.5 - Math.random());

    return sorted.map(adaptedProductList);
  }, [validId, products, isDataReady]);

  return sortedProducts;
};
