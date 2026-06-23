import { useMemo } from 'react';
import { Product } from '../../../types/Types';
import styles from './TechSpecs.module.scss';

interface TechSpecsProps {
  product: Product;
  variant: 'short' | 'full';
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ product, variant }) => {
  const specs = useMemo(() => {
    const baseSpecs = [
      { name: 'Screen', value: product.screen },
      { name: 'Resolution', value: product.resolution },
      { name: 'Processor', value: product.processor },
      { name: 'RAM', value: product.ram },
    ];

    if (variant === 'short') {
      return baseSpecs;
    }

    return [
      ...baseSpecs,
      { name: 'Built in memory', value: product.capacity },
      ...('camera' in product
        ? [{ name: 'Camera', value: product.camera }]
        : []),
      ...('zoom' in product ? [{ name: 'Zoom', value: product.zoom }] : []),
      { name: 'Cell', value: product.cell.join(', ') },
    ];
  }, [product, variant]);

  const containerClassName = `${styles.techSpecs} ${styles[`techSpecs--${variant}`]}`;

  return (
    <div className={containerClassName}>
      {specs.map(spec => (
        <div key={spec.name} className={styles.techSpecs__specs}>
          <span className={styles.techSpecs__name}>{spec.name}:</span>
          <span className={styles.techSpecs__value}>{spec.value}</span>
        </div>
      ))}
    </div>
  );
};
