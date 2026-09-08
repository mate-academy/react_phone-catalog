import styles from './IconItem.module.scss';

type Props = {
  count: number;
  img?: string;
  imgSubtitle?: string;
};

export const IconItem: React.FC<Props> = ({ count, img, imgSubtitle }) => {
  return (
    <div className={styles.button__container}>
      <img src={img} alt={imgSubtitle} />
      {count > 0 && <span className={styles.count__items}>{count}</span>}
    </div>
  );
};
