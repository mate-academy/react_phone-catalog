import styles from './ProductsList.module.scss';

type Props = {
  title?: string;
};

export const ProductsList = ({ title = 'ProductsList' }: Props) => {
  return <div className={styles.root}>{title}</div>;
};
