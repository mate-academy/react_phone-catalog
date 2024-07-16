import styles from './Footer.module.scss';
import { Logo } from '../Logo/Logo';
import arrowUp from '../../images/icons/arrowUp.svg';
import whiteUp from './icons/whiteUp.svg';
import classNames from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../../utils/AppContext';

export const Footer = () => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <div
      className={classNames(
        styles.container,
        isDarkTheme ? styles.containerDark : '',
      )}
    >
      <footer className={styles.footer}>
        <div className={styles.logoImage}>
          <Logo />
        </div>

        <ul className={styles.footer__links}>
          <li>
            <a
              className={classNames(
                styles.footer__link,
                isDarkTheme ? styles.footer__linkDark : '',
              )}
              target="_blank"
              href="https://github.com/KachVl"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className={classNames(
                styles.footer__link,
                isDarkTheme ? styles.footer__linkDark : '',
              )}
              target="_blank"
              href="https://github.com/KachVl"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li>
            <a
              className={classNames(
                styles.footer__link,
                isDarkTheme ? styles.footer__linkDark : '',
              )}
              target="_blank"
              href="https://github.com/KachVl"
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>

        <div className={styles.footer__goTop}>
          <span
            className={classNames(
              styles.goTop,
              isDarkTheme ? styles.goTopDark : '',
            )}
          >
            Back to top
          </span>

          <div
            className={classNames(
              styles.goTopButton,
              isDarkTheme ? styles.goTopDarkButton : '',
            )}
            style={
              isDarkTheme
                ? { backgroundImage: `url(${whiteUp})` }
                : { backgroundImage: `url(${arrowUp})` }
            }
            onClick={() => window.scrollTo(0, 0)}
          ></div>
        </div>
      </footer>
    </div>
  );
};
