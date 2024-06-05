import styles from './ProductParams.module.scss';

type Props = {
  phoneParams: { screen: string; capacity: string; ram: string };
};

export const ProductParams: React.FC<Props> = ({ phoneParams }) => {
  return (
    <section className={styles.phoneParams}>
      <div className={styles.phoneParams__param}>
        <p className={styles.phoneParams__param__name}>Screen</p>
        <p className={styles.phoneParams__param__overview}>
          {phoneParams.screen}
        </p>
      </div>
      <div className={styles.phoneParams__param}>
        <p className={styles.phoneParams__param__name}>Capacity</p>
        <p className={styles.phoneParams__param__overview}>
          {phoneParams.capacity}
        </p>
      </div>
      <div className={styles.phoneParams__param}>
        <p className={styles.phoneParams__param__name}>RAM</p>
        <p className={styles.phoneParams__param__overview}>{phoneParams.ram}</p>
      </div>
    </section>
  );
};
