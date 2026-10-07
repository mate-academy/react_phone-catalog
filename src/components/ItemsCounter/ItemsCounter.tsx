import styles from './ItemsCounter.module.scss';

interface Props {
  quantity: number;
}

export const ItemsCounter: React.FC<Props> = ({ quantity }) => {
  return (
    <div className={styles.items__counter}>
      {quantity > 99 ? '99+' : quantity}
    </div>
  );
};
