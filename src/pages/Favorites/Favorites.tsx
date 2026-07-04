/* eslint-disable @typescript-eslint/no-explicit-any */

//#region import
import styles from './Favorites.module.scss';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
//#endregion

//#region iconImports
import Right from '../../icons/Right.svg';
import Home from '../../icons/Home.svg';
import { BrandCard } from '../../components/BrandCard';
//#endregion

export function Favorites() {
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
            Favorites
          </Link>
        </div>

        <div className={styles.Top}>
          <h1 className={styles.Top__title}>Favourites</h1>
          <p className={styles.Top__items}>5 items</p>
        </div>

        <div className={styles.grids}>
          <BrandCard />
          <BrandCard />
          <BrandCard />
          <BrandCard />
          <BrandCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
