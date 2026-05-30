import styles from './Tablets.module.scss';
import { Filter } from '../Filter/Filter';
import { Footer } from '../Footer/Footer';
import { tabletData } from '../../data/tabletData';

export const Tablets = () => {
  const comeHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div>
        <div className={styles.containerFirstPartPage}>
          <div className={styles.continerIconHome} onClick={comeHome}>
            <img
              src="src/Icons/IconHome.svg"
              alt="Icon Home"
              className={styles.continerIconHome_iconHome}
            />
            <img
              src="src/Icons/DoorHome.svg"
              alt="Icon Door"
              className={styles.continerIconHome_iconDoor}
            />
          </div>

          <div className={styles.continerIconArrow}>
            <img
              src="src/Icons/leftArrow.svg"
              alt="Icon Arrow"
              className={styles.continerIconArrow_arrow}
            />
          </div>

          <h2 className={styles.textPhones}>Tablets</h2>
        </div>

        <h1 className={styles.textTile}>Mobile tablets</h1>
        <h6 className={styles.textChangeModels}>12 models</h6>
      </div>
      <Filter initialData={tabletData} />
      <Footer />
    </>
  );
};
