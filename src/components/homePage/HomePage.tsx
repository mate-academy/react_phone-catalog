import styles from './HomePage.module.scss';
import { SliderHomePage } from '../slider/SliderHomePage';
import { NavBar } from '../navBar';
import { AsideMenuPhone } from '../asideMenuPhone/asideMenuPhone';
import { BrandNewModel } from '../brandNewMode/brandNewMode';
export const HomePage = ({phones}) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <NavBar />

          <h1 className={styles.header__title}>
            Welcome to Nice Gadgets store!
          </h1>
          <SliderHomePage />
        </div>
      </header>
      <AsideMenuPhone />

      <main className={styles.main}>
        <div className={styles.main__content}>
          <section className={`${styles['brand-new-model']}`}>
            <BrandNewModel phones={ phones} />
          </section>
          <section className={`${styles['shop-by-category']}`}>
            <h2>Shop by category</h2>
            <h3>MobilePhones</h3>
            <h3>Tablet</h3>
            <h3>Accessories</h3>
          </section>
          <section className={`${styles['hot-prices']}`}>
            <h2>Hot prices</h2>
          </section>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </>
  );
};
