import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
};

export const ProductsSlider = ({ title }: Props) => {
  return <div className={styles.root}>ProductsSlider: {title}</div>;
};
