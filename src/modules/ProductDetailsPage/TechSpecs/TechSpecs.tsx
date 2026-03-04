import { useMemo } from 'react';
import { Product } from '../../../types/Types';
import styles from './TechSpecs.module.scss';

interface TechSpecsProps {
  product: Product;
}

export const TechSpecs: React.FC<TechSpecsProps> = ({ product }) => {
  const specs = useMemo(() => {
    return [
      { name: 'Screen', value: product.screen },
      { name: 'Resolution', value: product.resolution },
      { name: 'Processor', value: product.processor },
      { name: 'RAM', value: product.ram },
      ...('camera' in product
        ? [{ name: 'Camera', value: product.camera }]
        : []),
      ...('zoom' in product ? [{ name: 'Zoom', value: product.zoom }] : []),
    ];
  }, [product]);

  return (
    <div className={styles.techSpecs}>
      {specs.map(spec => (
        <div key={spec.name} className={styles.techSpecs__specs}>
          <span className={styles.techSpecs__specsName}>{spec.name}</span>
          <span className={styles.techSpecs__specsValue}>{spec.value}</span>
        </div>
      ))}
    </div>
  );
};
