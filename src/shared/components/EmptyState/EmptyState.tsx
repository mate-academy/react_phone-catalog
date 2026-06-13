import styles from './EmptyState.module.scss';

type Props = {
  productCategory: string;
};
export const EmptyState: React.FC<Props> = ({ productCategory }) => {
  return (
    <div className={styles['empty-state']}>
      There are no {productCategory} yet
    </div>
  );
};
