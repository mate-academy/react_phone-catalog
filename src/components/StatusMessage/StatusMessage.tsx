import React from 'react';
import styles from './StatusMessage.module.scss';

interface Props {
  text: string;
  onReload?: () => void;
}

export const StatusMessage: React.FC<Props> = ({ text, onReload }) => (
  <section className={styles.message}>
    <p className={styles.message__text}>{text}</p>

    {onReload && (
      <button
        type="button"
        className={styles.message__button}
        onClick={onReload}
      >
        Reload
      </button>
    )}
  </section>
);
