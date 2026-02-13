import React, { useState, useEffect } from 'react';
import { Product } from '../../../../types';
import { api } from '../../../../utils/api';
import { ProductsSlider } from '../../../HomePage/components/ProductsSlider';
import styles from './SuggestedProducts.module.scss';

interface Props {
  currentProductId: string;
}

export const SuggestedProducts: React.FC<Props> = ({ currentProductId }) => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        setLoading(true);
        const products = await api.getSuggestedProducts(currentProductId, 12);

        setSuggestedProducts(products);
      } catch (error) {
        //console.error('Error fetching suggested products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedProducts();
  }, [currentProductId]);

  if (loading || suggestedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.suggestedProducts}>
      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
