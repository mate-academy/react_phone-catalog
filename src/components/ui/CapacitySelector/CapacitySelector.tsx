import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchAllProducts } from '@/api/products';
import { ProductDetails } from '@/features/products/types/productDetails';
import styles from './CapacitySelector.module.scss';

interface CapacitySelectorProps {
  product: ProductDetails;
}

export const CapacitySelector = ({ product }: CapacitySelectorProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const handleCapacityChange = (capacity: string) => {
    const targetItemId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color.replace(/\s/g, '')}`;
    const targetProduct = allProducts.find(p => p.itemId === targetItemId);

    if (targetProduct) {
      navigate(`/${targetProduct.category}/${targetProduct.itemId}`);
    } else {
      navigate('/product-not-found');
    }
  };

  return (
    <div className={styles.section}>
      <p className={styles.sectionLabel}>{t('product.selectCapacity')}</p>
      <div className={styles.capacities}>
        {product.capacityAvailable.map(cap => (
          <button
            key={cap}
            className={`${styles.capacityBtn} ${cap === product.capacity ? styles.active : ''}`}
            onClick={() => handleCapacityChange(cap)}
          >
            {cap}
          </button>
        ))}
      </div>
    </div>
  );
};
