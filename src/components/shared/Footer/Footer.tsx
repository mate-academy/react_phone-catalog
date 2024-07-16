import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { useContext } from 'react';
import classNames from 'classnames';

export const Footer = () => {
  const { isSunSelected } = useContext(GlobalContext);

  const hendlerButtonScroll = () => {
    const headerElement = document.getElementById('header');

    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.information}>
          <ul className={styles.information__list}>
            <li className={styles.information__item}>
              <Link
                to="https://github.com/P-Nazar"
                className={classNames(styles.information__link, {
                  [styles['information__link-dark']]: !isSunSelected,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Link>
            </li>
            <li className={styles.information__item}>
              <Link
                to="/"
                className={classNames(styles.information__link, {
                  [styles['information__link-dark']]: !isSunSelected,
                })}
              >
                Contacts
              </Link>
            </li>
            <li className={styles.information__item}>
              <Link
                to="/"
                className={classNames(styles.information__link, {
                  [styles['information__link-dark']]: !isSunSelected,
                })}
              >
                rights
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.backToTop}>
          <p className={styles.backToTop__text}>Back to top</p>
          <button
            className={classNames(styles.backToTop__button, {
              [styles['backToTop__button-dark']]: !isSunSelected,
            })}
            onClick={hendlerButtonScroll}
          >
            {isSunSelected ? (
              <img src="img/footerIcons/backTop.svg" alt="backIcons" />
            ) : (
              <img src="img/footerIcons/backTopDark.svg" alt="backIcons" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
