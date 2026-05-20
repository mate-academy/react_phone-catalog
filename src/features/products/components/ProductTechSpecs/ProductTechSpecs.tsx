import { useTranslation } from 'react-i18next';
import { ProductDetails } from '@/features/products/types/productDetails';
import styles from './ProductTechSpecs.module.scss';

interface ProductTechSpecsProps {
  product: ProductDetails;
}

export const ProductTechSpecs = ({ product }: ProductTechSpecsProps) => {
  const { t } = useTranslation();

  const specs = [
    { label: t('products.specs.screen'), value: product.screen },
    { label: t('products.specs.resolution'), value: product.resolution },
    { label: t('products.specs.processor'), value: product.processor },
    { label: t('products.specs.ram'), value: product.ram },
    { label: t('products.specs.builtInMemory'), value: product.capacity },
    { label: t('products.specs.camera'), value: product.camera },
    { label: t('products.specs.zoom'), value: product.zoom },
    { label: t('products.specs.cell'), value: product.cell.join(', ') },
  ];

  return (
    <div className={styles.techSpecs}>
      <h2 className={styles.title}>{t('product.techSpecs')}</h2>
      <div className={styles.divider} />
      {specs.map(({ label, value }) => (
        <div key={label} className={styles.specRow}>
          <span className={styles.specLabel}>{label}</span>
          <span className={styles.specValue}>{value}</span>
        </div>
      ))}
    </div>
  );
};
