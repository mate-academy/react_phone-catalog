import { NavigationItem } from '@shared/types/NavLinkProps';
import { Logo } from '@ui/Logo';
import { NavList } from '@ui/nav__list';
import {
  FooterLabelProp,
  FooterNavName,
  FooterRoutePath,
} from './types/footerLinks';
import styles from './footer.module.scss';
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

  return (
    <footer className={`${styles.footer} ${className}`}>
      <Logo />
      <NavList
        key={'footer'}
        list={linksList}
        className={`${styles.footer__nav}`}
      />
      <FooterButtons />
    </footer>
  );
};
