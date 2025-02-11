import React from 'react';
import classNames from 'classnames';

import styles from './Characteristics.module.scss';

type Props = {
  characteristics: [string, string][];
  bodyText?: boolean;
  removePadding?: boolean;
};

export const Characteristics: React.FC<Props> = ({
  characteristics,
  bodyText,
  removePadding,
}) => {
  return (
    <article
      className={classNames(styles.characteristics, {
        [styles['characteristics--body-text']]: bodyText,
        [styles['characteristics--remove-padding']]: removePadding,
      })}
    >
      {characteristics.map(([key, value]) => (
        <div key={key} className={styles.characteristics__characteristic}>
          <div className={styles.characteristics__key}>{key}</div>
          <div className={styles.characteristics__value}>{value}</div>
        </div>
      ))}
    </article>
  );
};
