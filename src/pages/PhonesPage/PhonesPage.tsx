import { NavLink } from 'react-router-dom';
import styles from './PhonesPage.module.scss';
import { Catalog } from '../../components/Catalog';

export const PhonesPage = () => {
  return (
    <div className={`${styles.phonesPage} container`}>
      <section className={styles.phonesPage__nav}>
        <NavLink to="/" className={styles.phonesPage__homeLink} />

        <div className={styles.phonesPage__navArrow}></div>

        <NavLink to="phones" className={styles.phonesPage__phonesLink}>
          Phones
        </NavLink>
      </section>

      <h1 className={styles.phonesPage__title}>Mobile phones</h1>

      <p className={styles.phonesPage__subTitle}>95 models</p>

      <Catalog isSortingAvailable={true} />
    </div>
  );
};
