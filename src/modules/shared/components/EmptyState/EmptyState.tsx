import React from 'react';
import styles from './EmptyState.module.scss';

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<Props> = ({ title, description, action }) => (
  <div className={styles.state}>
    <div className={styles.emoji} aria-hidden>
      📭
    </div>
    <div>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
    {action}
  </div>
);
