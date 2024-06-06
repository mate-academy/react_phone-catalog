import styles from './ProductParams.module.scss';

type Props = {
  phoneParams: any;
  /* later im gonna change it to actual type*/
};

export const ProductParams: React.FC<Props> = ({ phoneParams }) => {
  const { screen, capacity, ram } = phoneParams;

  return (
    <section className={styles.phoneParams}>
      <div className={styles.phoneParams__param}>
        <p className={styles.phoneParams__param__name}>Screen</p>
        <p className={styles.phoneParams__param__overview}>{screen}</p>
      </div>
      <div className={styles.phoneParams__param}>
        <p className={styles.phoneParams__param__name}>Capacity</p>
        <p className={styles.phoneParams__param__overview}>{capacity}</p>
      </div>
      <div className={styles.phoneParams__param}>
        <p className={styles.phoneParams__param__name}>RAM</p>
        <p className={styles.phoneParams__param__overview}>{ram}</p>
      </div>
    </section>
  );
};
