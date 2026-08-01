import cn from 'classnames';
import { useTranslation } from '@shared/context';
import { Spec } from '../../utils';
import styles from './TechSpecs.module.scss';

interface Props {
  specs: Spec[];
  /** The short list next to the buttons uses smaller text. */
  isCompact?: boolean;
}

export const TechSpecs: React.FC<Props> = ({ specs, isCompact = false }) => {
  const { t } = useTranslation();

  return (
    <dl className={cn(styles.specs, { [styles.specsCompact]: isCompact })}>
      {specs.map(({ labelKey, value }) => (
        <div key={labelKey} className={styles.spec}>
          <dt className={styles.label}>{t(labelKey)}</dt>
          <dd className={styles.value}>{value}</dd>
        </div>
      ))}
    </dl>
  );
};
