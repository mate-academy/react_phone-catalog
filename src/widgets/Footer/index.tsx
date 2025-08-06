import { linksList } from './model';
import styles from './styles/footer.module.scss';
import { NavLink } from 'react-router-dom';
import { NavigationLink } from '@ui/navLink';
import { ArrowIcon } from '@shared/icons';

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <NavLink to="/">
        <img
          src="/src/shared/icons/logo.svg"
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%' }}
        />
      </NavLink>
      <nav role="navigation" aria-label="Footer navigation">
        <ul className={styles.footer__nav}>
          {linksList.map(link => (
            <NavigationLink key={link.name} data={link} />
          ))}
        </ul>
      </nav>
      <div className={styles.buttons}>
        <span>Back to top</span>
        <button onClick={() => goToTop()}>{<ArrowIcon />}</button>
      </div>
    </footer>
  );
};
