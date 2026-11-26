import styles from './TechSpecsSection.module.scss';

interface TechSpecsSectionProps {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

const SPECS: Array<{ key: keyof TechSpecsSectionProps; label: string }> = [
  { key: 'screen', label: 'Screen' },
  { key: 'resolution', label: 'Resolution' },
  { key: 'processor', label: 'Processor' },
  { key: 'ram', label: 'RAM' },
  { key: 'camera', label: 'Camera' },
  { key: 'zoom', label: 'Zoom' },
  { key: 'cell', label: 'Cell' },
];

export function TechSpecsSection({
  screen,
  resolution,
  processor,
  ram,
  camera,
  zoom,
  cell,
}: TechSpecsSectionProps): JSX.Element {
  const specsData = { screen, resolution, processor, ram, camera, zoom, cell };

  return (
    <section className={styles.section} aria-labelledby="techspecs-heading">
      <h2 id="techspecs-heading" className={styles.heading}>
        Tech specs
      </h2>
      <dl className={styles.list}>
        {SPECS.map(({ key, label }) => {
          const value = specsData[key];

          if (!value) {
            return null;
          }

          const displayValue = Array.isArray(value) ? value.join(', ') : value;

          return (
            <div key={key} className={styles.item}>
              <dt className={styles.label}>{label}</dt>
              <dd className={styles.value}>{displayValue}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
