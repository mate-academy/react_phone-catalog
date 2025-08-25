import styles from './SliderProduct.module.scss';

type Props = {
  title: string;
  image: string;
  buttonContent: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SliderProduct: React.FC<Props> = ({
  title,
  buttonContent,
  image,
  onClick,
}) => {
  const variantClass = image.includes('/phones/')
    ? styles.productSecond
    : image.includes('/tablets/')
      ? styles.productThird
      : styles.productFirst;

  return (
    <>
      <li className={`${styles.product} ${variantClass} ${styles.tablet}`}>
        <div className={styles.productContent}>
          <h3 className={styles.productContentTitle}>{title}</h3>
          <button
            onClick={onClick}
            className={`${styles.productContentButton} buttonText`}
          >
            {buttonContent}
          </button>
        </div>

        <div className={styles.productImage}>
          <img src={image} alt="Product" />
        </div>
      </li>

      <li className={`${styles.product} ${variantClass} ${styles.phone}`}>
        <div className={styles.productContent}>
          <h3 className={styles.productContentTitle}>{title}</h3>

          <div className={styles.productImage}>
            <img src={image} alt="Product" />
          </div>

          <button
            onClick={onClick}
            className={`${styles.productContentButton} buttonText`}
          >
            {buttonContent}
          </button>
        </div>
      </li>
    </>
  );
};
