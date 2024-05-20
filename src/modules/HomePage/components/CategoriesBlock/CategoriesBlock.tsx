import styles from './CategoriesBlock.module.scss';
import phonesImg from './images/phones.png';
import tabletsImg from './images/tablets.png';
import accessoriesImg from './images/accesories.png';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../../../utils/AppContext';
import classNames from 'classnames';
import { useContext } from 'react';

type Props = {
  phonesQuantity: number;
  tabletsQuantity: number;
  accessoriesQuantity: number;
};

export const CategoriesBlock: React.FC<Props> = ({
  phonesQuantity,
  tabletsQuantity,
  accessoriesQuantity,
}) => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <section className={styles.container}>
      <h2
        className={classNames(
          styles.blockTitle,
          isDarkTheme ? styles.blockTitleDark : '',
        )}
      >
        Shop by category
      </h2>

      <div className={styles.categoryCardsContainer}>
        <NavLink to={'/phones'} className={styles.categoryCard}>
          <img
            className={styles.categoryCard__image}
            src={phonesImg}
            alt="Phones image"
          />

          <h4
            className={classNames(
              styles.categoryCard__title,
              isDarkTheme ? styles.categoryCard__titleDark : '',
            )}
          >
            Mobile phones
          </h4>

          <span
            className={classNames(
              styles.categoryCard__info,
              isDarkTheme ? styles.categoryCard__infoDark : '',
            )}
          >
            {phonesQuantity} models
          </span>
        </NavLink>

        <NavLink to={'/tablets'} className={styles.categoryCard}>
          <img
            className={styles.categoryCard__image}
            src={tabletsImg}
            alt="Tablets image"
          />

          <h4
            className={classNames(
              styles.categoryCard__title,
              isDarkTheme ? styles.categoryCard__titleDark : '',
            )}
          >
            Tablets
          </h4>

          <span
            className={classNames(
              styles.categoryCard__info,
              isDarkTheme ? styles.categoryCard__infoDark : '',
            )}
          >
            {tabletsQuantity} models
          </span>
        </NavLink>

        <NavLink to={'/accessories'} className={styles.categoryCard}>
          <img
            className={styles.categoryCard__image}
            src={accessoriesImg}
            alt="Accessories image"
          />

          <h4
            className={classNames(
              styles.categoryCard__title,
              isDarkTheme ? styles.categoryCard__titleDark : '',
            )}
          >
            Accessories
          </h4>

          <span
            className={classNames(
              styles.categoryCard__info,
              isDarkTheme ? styles.categoryCard__infoDark : '',
            )}
          >
            {accessoriesQuantity} models
          </span>
        </NavLink>
      </div>
    </section>
  );
};
