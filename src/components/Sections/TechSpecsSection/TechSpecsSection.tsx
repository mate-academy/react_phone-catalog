import type { FC } from 'react';
import styles from './TechSpecsSection.module.scss';

interface TechSpecsSectionProps {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export const TechSpecsSection: FC<TechSpecsSectionProps> = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}) => {
  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
    { label: 'Built in memory', value: capacity },
    { label: 'Camera', value: camera },
    { label: 'Zoom', value: zoom },
    { label: 'Cell', value: cell.join(', ') },
  ];

  return (
    <section className={styles.techSpecsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tech specs</h2>
        <div className={styles.line}></div>
      </div>
      <div className={styles.info}>
        {specs.map((spec, index) => (
          <div
            key={index}
            className={styles.textContainer}
          >
            <p className={styles.secondaryText}>{spec.label}</p>
            <p className={styles.text}>{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
