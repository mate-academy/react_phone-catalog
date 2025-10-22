import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Logo } from '../Logo';

const handleButtonClick = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div>
            <Logo />
          </div>

          <ul className={styles.nav}>
            <li className={styles['nav-item']}>
              <Link
                to="https://github.com/VictorKomara"
                className={classNames(styles.link, styles.underline)}
                target="blank"
              >
                GITHUB
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link
                to="https://github.com/VictorKomara/react_phone-catalog"
                className={classNames(styles.link, styles.underline)}
                target="blank"
              >
                CONTACTS
              </Link>
            </li>
            <li className={styles['nav-item']}>
              <Link
                to="https://github.com/VictorKomara/react_phone-catalog"
                className={classNames(styles.link, styles.underline)}
                target="blank"
              >
                RIGHTS
              </Link>
            </li>
          </ul>

          <div
            className={styles['button-back__wrapper']}
            onClick={handleButtonClick}
          >
            <p
              className={classNames(
                styles['button-back__label'],
                styles.underline,
              )}
            >
              Back to top
            </p>

            <div className={styles['button-back']} aria-label="Scroll to top">
              <img
                className={styles['button-back__img']}
                src="src/images/icons/arrow-up.svg"
                alt="arrow up"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
