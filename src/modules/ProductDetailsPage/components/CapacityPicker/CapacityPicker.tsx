import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CapacityPicker.module.scss';

type Props = {
  capacities: string[];
  activeCapacity: string;
  onChange: (capacity: string) => void;
};

export const CapacityPicker: React.FC<Props> = ({
  capacities,
  activeCapacity,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.title}>{t('product.selectCapacity')}</div>

      <div className={styles.capacity}>
        {capacities.map(capacity => (
          <button
            key={capacity}
            type="button"
            className={classNames(styles.capacityOption, {
              [styles.capacityActive]: capacity === activeCapacity,
            })}
            onClick={() => onChange(capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>
    </div>
  );
};
