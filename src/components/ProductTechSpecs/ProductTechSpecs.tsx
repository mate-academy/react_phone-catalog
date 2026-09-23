import styles from './ProductTechSpecs.module.scss';

type ProductTechSpecsProps = {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  capacity: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export const ProductTechSpecs = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}: ProductTechSpecsProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Tech specs</h2>

      <div className={styles.sectionDivider} />

      <dl className={styles.specsList}>
        <div className={styles.row}>
          <dt className={styles.name}>Screen</dt>
          <dd className={styles.value}>{screen}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.name}>Resolution</dt>
          <dd className={styles.value}>{resolution}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.name}>Processor</dt>
          <dd className={styles.value}>{processor}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.name}>RAM</dt>
          <dd className={styles.value}>{ram}</dd>
        </div>

        <div className={styles.row}>
          <dt className={styles.name}>Built in memory</dt>
          <dd className={styles.value}>{capacity}</dd>
        </div>

        {camera && (
          <div className={styles.row}>
            <dt className={styles.name}>Camera</dt>
            <dd className={styles.value}>{camera}</dd>
          </div>
        )}

        {zoom && (
          <div className={styles.row}>
            <dt className={styles.name}>Zoom</dt>
            <dd className={styles.value}>{zoom}</dd>
          </div>
        )}

        {cell.length > 0 && (
          <div className={styles.row}>
            <dt className={styles.name}>Cell</dt>
            <dd className={styles.value}>
              {cell.map((type, index) => (
                <span key={type}>
                  {index > 0 && ', '}
                  {type}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
};
