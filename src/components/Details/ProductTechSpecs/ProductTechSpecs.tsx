import { DetailedProductWithNumericId } from '../../../api/productDetails';
import styles from './ProductTechSpecs.module.scss';

type ProductTechSpecsProps = {
  product: DetailedProductWithNumericId;
};

export const ProductTechSpecs = ({ product }: ProductTechSpecsProps) => {
  const specs = [
    { type: 'Screen', value: product.screen },
    { type: 'Resolution', value: product.resolution },
    { type: 'Processor', value: product.processor },
    { type: 'RAM', value: product.ram },
    { type: 'Built in memory', value: product.capacity },
    { type: 'Camera', value: 'camera' in product ? product.camera : undefined },
    { type: 'Zoom', value: 'zoom' in product ? product.zoom : undefined },
    { type: 'Cell', value: product.cell.join(', ') },
  ].filter(spec => spec.value);

  return (
    <section className={styles.techSpecs}>
      <div className={styles.techSpecs__title}>
        <p>Tech specs</p>
      </div>

      {specs.map(spec => (
        <div key={spec.type} className={styles.techSpecs__block}>
          <div className={styles['techSpecs__block--type']}>
            <p>{spec.type}</p>
          </div>

          <div className={styles['techSpecs__block--value']}>
            <p>{spec.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
