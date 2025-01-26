import classNames from 'classnames';
import { DecorativeLine } from '../../../shared/components/DecorativeLine';
import { ProductDetails } from '../../../shared/types/types';
import styles from './TechSpecs.module.scss';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { separateValueFromUnit } from '../../../shared/functions/functions';
import { Category } from '../../../shared/types/enums';

type Props = {
  product: ProductDetails;
  className?: string;
};

export const TechSpecs: React.FC<Props> = ({ product, className }) => {
  const {
    techSpecs,
    screen: screenLabel,
    resolution: resolutionLabel,
    processor: processorLabel,
    ram: ramLabel,
    memory: memoryLabel,
    size: sizeLabel,
    camera: cameraLabel,
    zoom: zoomLabel,
    cell: cellLabel,
  } = useLanguage().localeTexts;

  const {
    category,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = product;

  return (
    <section className={classNames(styles.TechSpecs, className)}>
      <h3 className={styles.Title}>{techSpecs}</h3>
      <DecorativeLine />

      <ul className={styles.Parameters}>
        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{screenLabel}</p>
          <p className={styles.ParameterValue}>{screen}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{resolutionLabel}</p>
          <p className={styles.ParameterValue}>{resolution}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{processorLabel}</p>
          <p className={styles.ParameterValue}>{processor}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>{ramLabel}</p>
          <p className={styles.ParameterValue}>{separateValueFromUnit(ram)}</p>
        </li>

        <li className={styles.Parameter}>
          <p className={styles.ParameterName}>
            {category === Category.Accessories ? sizeLabel : memoryLabel}
          </p>

          <p className={styles.ParameterValue}>
            {separateValueFromUnit(capacity)}
          </p>
        </li>

        {camera && (
          <li className={styles.Parameter}>
            <p className={styles.ParameterName}>{cameraLabel}</p>
            <p className={styles.ParameterValue}>{camera}</p>
          </li>
        )}

        {zoom && (
          <li className={styles.Parameter}>
            <p className={styles.ParameterName}>{zoomLabel}</p>
            <p className={styles.ParameterValue}>{zoom}</p>
          </li>
        )}

        {cell[0] !== 'Not applicable' && (
          <li className={styles.Parameter}>
            <p className={styles.ParameterName}>{cellLabel}</p>
            <p className={styles.ParameterValue}>{cell.join(', ')}</p>
          </li>
        )}
      </ul>
    </section>
  );
};
