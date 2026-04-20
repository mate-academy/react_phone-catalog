import { Product } from '../../types/Product';
import styles from './TechSpecBlock.module.scss';

interface Props {
  product: Product;
}

export const TechSpecBlock: React.FC<Props> = ({ product }) => {
  const techSpecs = [
    { label: 'screen', value: product.screen },
    { label: 'resolution', value: product.resolution },
    { label: 'processor', value: product.processor },
    {
      label: 'RAM',
      value: product.ram ? product.ram.replace(/([0-9])([A-Z])/, '$1 $2') : '',
    },
    { label: 'camera', value: product.camera },
    { label: 'zoom', value: product.zoom },
    {
      label: 'cell',
      value: Array.isArray(product.cell)
        ? product.cell.join(', ')
        : product.cell,
    },
  ];
  return (
    <>
      <h2 className={styles.techTitle}>Tech specs</h2>
      <div className={styles.specs}>
        {techSpecs.map(spec => (
          <div key={spec.label} className={styles.specRow}>
            <span className={styles.labelText}>{spec.label}</span>
            <span className={styles.valueText}>{spec.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};
