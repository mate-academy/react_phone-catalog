import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Breadcrumb.module.scss';

// Icons
import HouseIcon from './icons/house.png';
import HouseDarkIcon from './icons/house-dark.png';
import ArrowIcon from './icons/arrow.png';
import ArrowDarkIcon from './icons/arrow-dark.png';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<Props> = ({ items }) => {
  const { t } = useTranslation();

  // Get current theme
  const [theme, setTheme] = useState<'light' | 'dark'>((document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light');

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';

      setTheme(currentTheme || 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Select icons based on theme
  const houseIconSrc = theme === 'dark' ? HouseDarkIcon : HouseIcon;
  const arrowIconSrc = theme === 'dark' ? ArrowDarkIcon : ArrowIcon;

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {/* Home Icon */}
      <Link to="/" className={styles.link}>
        <img src={houseIconSrc} alt={t('home')} className={styles.homeIcon} />
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {/* Arrow Separator */}
          <img src={arrowIconSrc} alt="" className={styles.arrowIcon} aria-hidden="true" />

          {/* Item Link or Text */}
          {item.path ? (
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
