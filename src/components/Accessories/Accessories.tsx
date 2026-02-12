import styles from './Accessories.module.scss';
import { Filter } from '../Filter/Filter';
import { Footer } from '../Footer/Footer';
import { accessoriesData } from '../../data/accessoriesData';

export const Accessories = () => {
  const comeHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <div>
        <div className={styles.accessoriesPage__header}>
          <div className={styles.accessoriesPage__homeIcon} onClick={comeHome}>
            <img
              src="src/Icons/IconHome.svg"
              alt="Icon Home"
              className={styles.accessoriesPage__homeIcon__imgHome}
            />
            <img
              src="src/Icons/DoorHome.svg"
              alt="Icon Door"
              className={styles.accessoriesPage__homeIcon__imgDoor}
            />
          </div>

          <div className={styles.accessoriesPage__backArrow}>
            <img
              src="src/Icons/leftArrow.svg"
              alt="Icon Arrow"
              className={styles.accessoriesPage__backArrow__img}
            />
          </div>

          <h2 className={styles.accessoriesPage__titleSmall}>Accessories</h2>
        </div>

        <h1 className={styles.accessoriesPage__titleLarge}>
          Mobile accessories
        </h1>
        <h6 className={styles.accessoriesPage__subtitle}>8 models</h6>
      </div>
      <Filter initialData={accessoriesData} />
      <Footer />
    </>
  );
};
