import { t } from 'i18next';

import { Typography } from '@/components/atoms';
import { ImageWithFallback } from '@/components/organisms/ImageWithFallback';

import styles from './Spec.module.scss';

type Props = {
  label: string;
  value: string;
  icon: string;
};

export const Spec = ({ label, value, icon }: Props) => {
  return (
    <div
      className={styles.container}
      title={`${label}: ${value}`}
    >
      <ImageWithFallback
        src={icon}
        alt={t(`spec${label}`)}
        className={styles.icon}
      />

      <Typography
        variant="smalltext"
        className={styles.text}
      >
        {value}
      </Typography>
      <span
        className={styles.divider}
        aria-hidden="true"
      />
    </div>
  );
};
