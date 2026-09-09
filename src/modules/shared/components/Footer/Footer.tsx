import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logo from '../../assets/Logo.svg';
import arrowUpIcon from '../../assets/icons/arrow-up.svg';
import { footerItems } from '../../constants/navigation';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Nice Gadgets logo" />
        </Link>

        <nav className={styles.nav}>
          {footerItems.map(item =>
            // внешний URL — обычный <a> в новой вкладке,
            // NavLink сломал бы его: router сделал бы push('/https://...')
            item.to.startsWith('http') ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {item.text}
              </a>
            ) : (
              <Link key={item.to} to={item.to} className={styles.link}>
                {item.text}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          Back to top
          <span className={styles.backToTopIcon}>
            <img src={arrowUpIcon} alt="" />
          </span>
        </button>
      </div>
    </footer>
  );
};
