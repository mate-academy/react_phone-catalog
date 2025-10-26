import styles from './NoCategory.module.scss';

interface NoCategoryProps {
  category?: string | undefined;
}

export const NoCategory: React.FC<NoCategoryProps> = ({ category }) => {
  return (
    <div className={styles.status}>
      There are no {category ? category : 'products'} yet
    </div>
  );
};
