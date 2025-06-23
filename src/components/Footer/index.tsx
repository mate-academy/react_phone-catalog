import { NavigationItem } from '../../shared/types/NavLinkProps';
import { Logo } from '../../shared/ui/Logo';
import { NavList } from '../../shared/ui/nav__list';
import {
  FooterLabelProp,
  FooterNavName,
  FooterRoutePath,
} from './types/footerLinks';
import styles from './footer.module.scss';
import { MenuButton } from '../../shared/ui/menu-button';
import {
  ButtonsProps,
  FooterButtonName,
  Path,
} from '../../shared/types/Menu-UIProps';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const linksList: NavigationItem[] = [
    {
      name: FooterNavName.Github,
      path: FooterRoutePath.Github,
      labelProp: FooterLabelProp.Github,
    },
    {
      name: FooterNavName.Contacts,
      path: FooterRoutePath.Contacts,
      labelProp: FooterLabelProp.Contacts,
    },
    {
      name: FooterNavName.Rights,
      path: FooterRoutePath.Rights,
      labelProp: FooterLabelProp.Rights,
    },
  ];

  const button: ButtonsProps = {
    name: FooterButtonName.Top,
    path: Path.Up,
  };

  return (
    <footer className={styles.footer}>
      <Logo className={`${styles.footer__logo} footer__logo`} />
      <NavList key={'footer'} list={linksList} cN={`${styles.footer__nav}`} />
      <div className={styles['footer-btn-container']}>
        <Link to={'/'} className={styles['footer-text']}>
          Back to top
        </Link>
        <MenuButton data={button} className={styles['footer-button']} />
      </div>
    </footer>
  );
};
