import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchAllProducts } from '@/api/products';
import { ProductDetails } from '@/features/products/types/productDetails';
import styles from './ColorSelector.module.scss';
import { COLOR_MAP } from '@/constants/colorMap';
import { QUERY_KEYS } from '@/api/queryKeys';

interface ColorSelectorProps {
  product: ProductDetails;
}

export const ColorSelector = ({ product }: ColorSelectorProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: allProducts = [] } = useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: fetchAllProducts,
  });

  const handleColorChange = (color: string) => {
    const targetItemId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color.replace(/\s/g, '')}`;
    const targetProduct = allProducts.find(p => p.itemId === targetItemId);

    if (targetProduct) {
      navigate(`/${targetProduct.category}/${targetProduct.itemId}`);
    } else {
      navigate('/product-not-found');
    }
  };

  return (
    <div className={styles.section}>
      <p className={styles.sectionLabel}>{t('product.availableColors')}</p>
      <div className={styles.colors}>
        {product.colorsAvailable.map(color => {
          const normalizedColor = color.replace(/\s/g, '').toLowerCase();
          const cssColor = COLOR_MAP[normalizedColor] || color;

          return (
            <button
              key={color}
              className={`${styles.colorBtn} ${color === product.color ? styles.active : ''}`}
              style={{ backgroundColor: cssColor }}
              aria-label={color}
              onClick={() => handleColorChange(color)}
            />
          );
        })}
      </div>
    </div>
  );
};
