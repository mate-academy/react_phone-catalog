import styles from './Phones.module.scss';
import { Products } from '../ProductComponent/Products';
import { usePhones } from '../../contexts/PhonesContext';
import { Loader } from '../Loader';
export const Phones = () => {
  const { phones, isError, isLoading, reload } = usePhones();

  return (
    <section className={styles.phones} id="phones">
      <div className={styles.phones__linkNavigation}>
        <a href="/" className={styles.phones__linkHome}></a>
        <a href="" className={styles.phones__arrowRight}></a>
        <a href="/phones" className={styles.phones__currentLink}>
          Phones
        </a>
      </div>
      <h1 className={styles.phones__title}>Mobile phones</h1>

      {phones.length !== 0 && !isLoading && (
        <p className={styles.phones__quantity}>{phones.length} models</p>
      )}

      {isLoading && <Loader />}

      {phones.length !== 0 && !isLoading && <Products products={phones} />}

      {!phones.length && !isError && !isLoading && (
        <p className={styles.phones__noProducts}>There are no phones yet</p>
      )}

      {!isLoading && isError && (
        <>
          <p className={styles.phones__error}>Something went wrong!</p>
          <button type="button" onClick={reload} className={styles.phones__reload}>
            Reload
          </button>
        </>
      )}
    </section>
  );
};
