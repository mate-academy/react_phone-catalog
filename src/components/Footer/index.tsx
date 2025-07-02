import { NavigationItem } from '@shtypes/NavLinkProps';
import { Logo } from '@ui/Logo';
import { NavList } from '@ui/nav__list';
import {
  FooterLabelProp,
  FooterNavName,
  FooterRoutePath,
} from './types/footerLinks';
import styles from './footer.module.scss';
import { ButtonsProps, ButtonNames, Path } from '@shtypes/ButtonProps';
import { FooterButtons } from './components/footer-buttons';

type Props = {
  className: string;
};

export const Footer: React.FC<Props> = ({ className }) => {
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

  const data: ButtonsProps = {
    name: ButtonNames.Top,
    path: Path.Up,
  };

  return (
    <footer className={`${styles.footer} ${className}`}>
      <Logo className={`${styles.footer__logo} footer__logo`} />
      <NavList key={'footer'} list={linksList} cN={`${styles.footer__nav}`} />
      <FooterButtons data={data} className={styles['footer__btn-container']} />
    </footer>
  );
};
