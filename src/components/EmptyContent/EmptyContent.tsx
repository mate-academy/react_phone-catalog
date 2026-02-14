import styles from './EmptyContent.module.scss';

type EmptyContentProps = {
  title: string;
};

export const EmptyContent = ({ title }: EmptyContentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <span>{title}</span>
        <img src={'img/cart-is-empty.png'} />
      </div>
    </div>
  );
};
