import React from 'react';
import classNames from 'classnames';
import styles from './Error.module.scss';

type Props = {
  error: string;
  reload?: () => void;

  className?: string;
};

export const Error: React.FC<Props> = ({ error, reload, className }) => {
  return (
    <div className={classNames(className, styles.error)}>
      {error}

      {reload && (
        <button className={styles.error__icon} onClick={() => reload()}>
          ⟳
        </button>
      )}
    </div>
  );
};
