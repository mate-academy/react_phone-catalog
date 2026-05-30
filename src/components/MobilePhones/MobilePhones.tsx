import styles from './MobilePhones.module.scss';
import { Filter } from '../Filter/Filter';
import { Footer } from '../Footer/Footer';

export const MobilePhones = () => {
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
              className={styles.continerIconHome__iconHome}
            />
            <img
              src="src/Icons/DoorHome.svg"
              alt="Icon Door"
              className={styles.continerIconHome__iconDoor}
            />
          </div>

          <div className={styles.continerIconArrow}>
            <img
              src="src/Icons/leftArrow.svg"
              alt="Icon Arrow"
              className={styles.continerIconArrow__Arrow}
            />
          </div>

          <h2 className={styles.textPhones}>Phones</h2>
        </div>

        <h1 className={styles.textTile}>Mobile phones</h1>
        <h6 className={styles.textChangeModels}>95 models</h6>
      </div>
      <Filter />
      <Footer />
    </>
  );
};
