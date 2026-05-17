import React from 'react';
import styles from './Description.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  discriptions: { [key: string]: string | number }[];
}

export const Description: React.FC<Props> = ({ discriptions }) => {
  const { t } = useTranslation();
  return (
    <dl className={styles.descriptions}>
      {discriptions.map(item =>
        Object.entries(item).map(([key, value]) => (
          <React.Fragment key={value}>
            <dt className={styles.descriptions__name}>{t(key)}</dt>
            <dd className={styles.descriptions__value}>{value}</dd>
          </React.Fragment>
        )),
      )}
    </dl>
  );
};
