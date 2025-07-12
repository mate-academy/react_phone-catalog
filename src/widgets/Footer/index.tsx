import { linksList } from './model';
import styles from './styles/footer.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { NavigationLink } from '@ui/navLink';
import btn from '@shared/styles/regularButton.module.scss';
import { Button } from '@ui/button';
import { AriaNames, IconPath } from '@shared/types/ButtonProps';

type Props = {
  className: string;
};

const buttonCN = {
  main: btn.button,
  icon: btn.button__icon,
};

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <footer className={`${styles.footer} ${className}`}>
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
      <div className={styles.footer__btns}>
        <Link to={'#top'}>Back to top</Link>
        <Button
          ariaName={AriaNames.Top}
          iconPath={IconPath.Up}
          className={buttonCN}
          fn={goToTop}
        />
      </div>
    </footer>
  );
};
