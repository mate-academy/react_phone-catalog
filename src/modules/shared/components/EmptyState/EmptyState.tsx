import { ReactNode } from 'react';
import styles from './EmptyState.module.scss';

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: Props) => (
  <div className={styles.empty}>
    <p className={styles.title}>{title}</p>
    {description && <p className={styles.description}>{description}</p>}
    {action}
  </div>
);
