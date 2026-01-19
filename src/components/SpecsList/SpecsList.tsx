import { useTranslation } from 'react-i18next';
import { SpecsMap } from '../../types/SpecsMap';
import styles from './SpecsList.module.scss';

type Props = {
  specs: SpecsMap;
};

export const SpecsList: React.FC<Props> = ({ specs }) => {
  const { t } = useTranslation();

  return (
    <dl className={styles.specs}>
      {Object.entries(specs).map(([label, value]) => (
        <div className={styles.specs__item} key={label}>
          <dt className={styles.specs__label}>{t(label)}</dt>
          <dd className={styles.specs__value}>
            {Array.isArray(value) ? value.join(', ') : value}
          </dd>
        </div>
      ))}
    </dl>
  );
};
