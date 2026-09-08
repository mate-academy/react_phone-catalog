import styles from './EmptyMessage.module.scss';

export const EmptyMessage: React.FC<{ category: string }> = ({ category }) => (
  <div className={styles.empty_message}>There are no {category} yet 😢</div>
);
