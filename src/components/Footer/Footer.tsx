import styles from './Footer.module.scss';
import { Logo } from '../Logo';
import { Icon } from '../Icon';
import classNames from 'classnames';

export const Footer = () => {
  const links = [
    { link: 'https://github.com/ArtemHryb', name: 'Github' },
    { link: 'https://github.com/ArtemHryb', name: 'Contacts' },
    { link: 'https://github.com/ArtemHryb', name: 'Rights' },
  ];

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles['active-footer-link'] : '';

  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__logo} onClick={scrollTop}>
          <Logo isFooter={true} />
        </div>

        <ul className={styles.footer__list}>
          {links.map(item => (
            <li className={styles.footer__item} key={item.name}>
              <a
                className={classNames(
                  styles.footer__link,
                  getActiveClass({ isActive: true }),
                )}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.footer__elevator} onClick={scrollTop}>
          <div className={styles.footer__elevatorText}>Back to top</div>

          <button className={styles.footer__btn}>
            <Icon type="arrowTop" />
          </button>
        </div>
      </div>
    </div>
  );
};
