import styles from './CategoryCard.module.scss';

type CategoryCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  onClick: () => void;
  backgroundColor?: string;
  imgHeight?: string;
  imgWidth?: string;
  imgTransform?: string;
};

export const CategoryCard = ({
  imgUrl,
  title,
  description,
  onClick,
  backgroundColor,
  imgWidth,
  imgHeight,
  imgTransform,
}: CategoryCardProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.container__photo}
        style={{
          ...(backgroundColor != null && { backgroundColor }),
        }}
      >
        <img
          src={imgUrl}
          alt="Category photo"
          style={{
            ...(imgWidth != null && { maxWidth: imgWidth }),
            ...(imgHeight != null && { maxHeight: imgHeight }),
            ...(imgTransform != null && { transform: imgTransform }),
          }}
        />
      </div>
      <div className={styles.container__info}>
        <span className={styles.container__info__title}>{title}</span>
        <span className={styles.container__info__amount}>{description}</span>
      </div>
    </div>
  );
};
