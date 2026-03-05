import { useTranslation } from 'react-i18next';
import {
  NAVIGATION_LINKS,
  LINK_CLASS_NAME,
} from '../constants/footerConstants';
import { NavigationLinkItem } from './NavigationLinkItem';

interface FooterNavigationProps {
  className?: string;
}

export const FooterNavigation = ({ className }: FooterNavigationProps) => {
  const { t } = useTranslation();

  return (
    <nav className={className}>
      {NAVIGATION_LINKS.map((link) => {
        const label = link.translationKey ? t(link.translationKey) : link.label;

        return (
          <NavigationLinkItem
            key={link.to}
            link={link}
            label={label}
            className={LINK_CLASS_NAME}
          />
        );
      })}
    </nav>
  );
};
