/* eslint-disable @typescript-eslint/no-explicit-any */

//#region import
import styles from './Cart.module.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
//#endregion

//#region iconImports
import Right from '../../icons/Right.svg';
import Home from '../../icons/Home.svg';
//#endregion

export function Cart() {
  return (
    <div className={styles.phonesPage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.BreadCrumbs}>
          <Link to={'/'} className={styles.BreadCrumbs__link}>
            <img src={Home} alt="" className={styles.BreadCrumbs__img} />
          </Link>
          <img src={Right} alt="" />
          <Link to={'/favorites'} className={styles.BreadCrumbs__link}>
            Cart
          </Link>
        </div>
        <div className={styles.cart}>
          <div className={styles.products}></div>
          <div className={styles.total}></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
