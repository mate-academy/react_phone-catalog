import React from 'react';
import { NavLink, useMatch, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { navigationLinks, footerLinks } from './navigationLink';
import styles from './Navigation.module.scss';

export interface NavigationProps {
  variant: 'horizontal' | 'vertical' | 'footer';
  onLinkClick?: () => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ variant, onLinkClick, className }) => {
  const { t } = useTranslation();
  const location = useLocation();

  // Check if we're on a product details page
  const productMatch = useMatch('/product/:productId');

  // Get category from location state (passed when navigating from category or product page)
  const stateCategory = (location.state as { category?: string })?.category;

  // Use footer links for footer variant, otherwise use main navigation links
  const links = variant === 'footer' ? footerLinks : navigationLinks;

  // Helper to check if a category link should be active
  const isCategoryLinkActive = (linkPath: string): boolean => {
    // If we're on a product page and have category in state, check if it matches
    if (productMatch && stateCategory) {
      return linkPath === `/${stateCategory}`;
    }

    return false;
  };

  return (
    <nav className={`${styles.navigation} ${styles[variant]} ${className || ''}`} aria-label={variant === 'footer' ? 'Footer navigation' : 'Main navigation'}>
      <ul className={styles.list}>
        {links.map(link => (
          <li key={link.to} className={styles.item}>
            {link.external ? (
              // External link (like GitHub)
              <a href={link.to} target="_blank" rel="noopener noreferrer" className={styles.link} onClick={onLinkClick}>
                {t(link.labelKey)}
              </a>
            ) : (
              // Internal link
              <NavLink
                to={link.to}
                className={({ isActive }) => {
                  // Check if this link should be active based on product page category
                  const shouldBeActive = isActive || isCategoryLinkActive(link.to);

                  return `${styles.link} ${shouldBeActive ? styles.active : ''}`;
                }}
                onClick={onLinkClick}
                end={link.to === '/'}
              >
                {t(link.labelKey)}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
