import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const FOOTER_ITEMS = [
    {
      label: 'GITHUB',
      // eslint-disable-next-line max-len
      href: 'https://github.com/SerMamchur/react_phone-catalog?tab=readme-ov-file',
    },
    { label: 'CONTACTS', href: '#' },
    { label: 'RIGHTS', href: '#' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/">
          <img
            src="./img/Logo.svg"
            alt="logo"
            className={styles['footer-logo']}
          />
        </NavLink>
        <div className={styles['footer-middle-block-wrapper']}>
          <ul className={styles['footer-list']}>
            {FOOTER_ITEMS.map(item => {
              return (
                <li className={styles['footer-item']} key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    className={styles['footer-link']}
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles['footer-back']}>
          <p className={styles['footer-back--text']}>Back to top</p>
          <div className={styles['footer-circle']}>
            <button
              className={styles['footer-button']}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            ></button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
