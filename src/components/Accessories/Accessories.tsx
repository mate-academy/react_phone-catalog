import styles from './Accessories.module.scss';
import { Products } from '../ProductComponent/Products';
import { useAccessories } from '../../contexts/AccessoriesContext';
import { Loader } from '../Loader';

export const Accessories = () => {
  const { accessories, isError, isLoading, reload } = useAccessories();

  return (
    <section className={styles.accessories} id="phones">
      <div className={styles.accessories__linkNavigation}>
        <a href="/" className={styles.accessories__linkHome}></a>
        <a href="" className={styles.accessories__arrowRight}></a>
        <a href="/accessories" className={styles.accessories__currentLink}>
          Accessories
        </a>
      </div>
      <h1 className={styles.accessories__title}>Accessories</h1>

      {accessories.length !== 0 && !isLoading && (
        <p className={styles.accessories__quantity}>{accessories.length} models</p>
      )}

      {isLoading && <Loader />}

      {accessories.length !== 0 && !isLoading && <Products products={accessories} />}

      {!accessories.length && !isError && !isLoading && (
        <p className={styles.accessories__noProducts}>There are no accessories yet</p>
      )}

      {!isLoading && isError && (
        <>
          <p className={styles.accessories__error}>Something went wrong!</p>
          <button type="button" onClick={reload} className={styles.accessories__reload}>
            Reload
          </button>
        </>
      )}
    </section>
  );
};
