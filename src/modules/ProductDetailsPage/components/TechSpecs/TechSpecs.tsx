import { ProductDetails } from '../../../../types/ProductDetails';
import styles from './TechSpecs.module.scss';

type Props = {
  product: ProductDetails;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell?.join(', ') },
  ].filter(spec => spec.value);

  return (
    <dl className={styles.specs}>
      {specs.map(spec => (
        <div key={spec.label} className={styles.specs__row}>
          <dt className={styles.specs__label}>{spec.label}</dt>
          <dd className={styles.specs__value}>{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
};
