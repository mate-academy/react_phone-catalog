import styles from './Tablets.module.scss';
import { Products } from '../ProductComponent/Products';
import { useTablets } from '../../contexts/TabletsContext';
import { Loader } from '../Loader';

export const Tablets = () => {
  const { tablets, isLoading, isError, reload } = useTablets();

  return (
    <section className={styles.tablets} id="tablets">
      <div className={styles.tablets__linkNavigation}>
        <a href="/" className={styles.tablets__linkHome}></a>
        <a href="" className={styles.tablets__arrowRight}></a>
        <a href="/tablets" className={styles.tablets__currentLink}>
          Tablets
        </a>
      </div>
      <h1 className={styles.tablets__title}>Tablets</h1>

      {tablets.length !== 0 && !isLoading && (
        <p className={styles.tablets__quantity}>{tablets.length} models</p>
      )}

      {isLoading && <Loader />}

      {tablets.length !== 0 && !isLoading && <Products products={tablets} />}

      {!tablets.length && !isError && !isLoading && (
        <p className={styles.tablets__noProducts}>There are no tablets yet</p>
      )}

      {!isLoading && isError && (
        <>
          <p className={styles.tablets__error}>Something went wrong!</p>
          <button type="button" onClick={reload} className={styles.tablets__reload}>
            Reload
          </button>
        </>
      )}
    </section>
  );
};
