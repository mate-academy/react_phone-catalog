import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ProductSpec.module.scss';
import { SpecItem } from './spec-item/SpecItem';

type TProps = {
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  capacity?: string;
  memory?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

export const ProductSpec: FC<TProps> = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  memory,
  camera,
  zoom,
  cell,
}) => {
  const { t } = useTranslation();

  const specs = {
    screen,
    resolution,
    processor,
    ram,
    capacity: memory ? '' : capacity,
    memory,
    camera,
    zoom,
    cell: cell?.join(', ') || '',
  };

  return (
    <div className={styles.specs}>
      {Object.entries(specs).map(([spec, value]) =>
        value ? (
          <SpecItem
            key={spec}
            label={t(`product.tech.${spec}`)}
            value={value}
          />
        ) : null,
      )}
    </div>
  );
};
