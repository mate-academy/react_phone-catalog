import { Phone } from '../../../../types/Phone';
import styles from './TechSpecs.styles.module.scss';

type Props = {
  product: Phone;
};

export const TechSpecs: React.FC<Props> = ({ product }) => {
  const techSpecs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell },
  ];

  return (
    <section className={styles.techSpecs}>
      <h2 className={styles.techSpecsTitle}>Tech specs</h2>
      <div className={styles.techSpecsPreview}>
        {techSpecs.map(techSpec => (
          <div key={techSpec.label} className={styles.infoRow}>
            <span className={styles.techSpecLabel}>{techSpec.label}</span>
            <span className={styles.techSpecValue}>{techSpec.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
