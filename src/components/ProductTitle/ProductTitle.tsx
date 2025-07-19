import styles from './ProductTitle.module.scss';

type Props = {
  title: string;
  id: string;
};

export const ProductTitle: React.FC<Props> = ({ title }) => {
  return <div className={styles.title}>{title}()</div>;
};
