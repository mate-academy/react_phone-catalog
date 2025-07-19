import styles from './ProductImage.module.scss';

type Props = {
  src: string;
  alt: string;
};

export const ProductImage: React.FC<Props> = ({ src, alt }) => {
  return (
    <div className={styles.img}>
      <img src={`/${src}`} alt={alt} />
    </div>
  );
};
