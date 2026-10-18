import classNames from 'classnames';
import { ProductDetails } from '../../../../types';
import styles from './TechSpecs.module.scss';

interface Props {
  details: ProductDetails;
  isShort?: boolean;
}

export const TechSpecs = ({ details, isShort = false }: Props) => {
  const shortSpecs = [
    { label: 'Screen', value: details.screen },
    { label: 'Resolution', value: details.resolution },
    { label: 'Processor', value: details.processor },
    { label: 'RAM', value: details.ram },
  ];
  const allSpecs = [
    ...shortSpecs,
    { label: 'Built in memory', value: details.capacity },
    { label: 'Camera', value: details.camera },
    { label: 'Zoom', value: details.zoom },
    { label: 'Cell', value: details.cell.join(', ') },
  ].filter(spec => spec.value);

  const specs = isShort ? shortSpecs : allSpecs;

  return (
    <section
      className={classNames(styles['tech-specs'], {
        [styles['tech-specs--short']]: isShort,
      })}
    >
      {!isShort && <h2 className={styles['tech-specs__title']}>Tech specs</h2>}

      <dl className={styles['tech-specs__list']}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles['tech-specs__row']}>
            <dt className={styles['tech-specs__name']}>{label}</dt>
            <dd className={styles['tech-specs__value']}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
