import { Capacity, Ram, Screens } from '@shared/types/APITypes';
import styles from './desriptionList.module.scss';

type Props = {
  screen: Screens;
  capacity: Capacity;
  ram: Ram;
};

export const Description: React.FC<Props> = ({ screen, capacity, ram }) => {
  return (
    <dl className={styles.descr}>
      <dt className={styles.descr__type}>Screen</dt>
      <dd className={styles.descr__val}>{screen}</dd>

      <dt className={styles.descr__type}>Capacity</dt>
      <dd className={styles.descr__val}>{capacity}</dd>

      <dt className={styles.descr__type}>RAM</dt>
      <dd className={styles.descr__val}>{ram}</dd>
    </dl>
  );
};
