import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import type { Product } from '../../types/product';
import { ChevronIcon, HomeIcon } from '../iconsSVG';
import styles from './BreadCrumbs.module.scss';

type Crumb = { label: string; to?: string };

type SimpleProduct = Partial<Pick<Product, 'category' | 'name' | 'itemId'>>;

type Props = {
  location?: string[];
  product?: SimpleProduct;
  category?: string;
  name?: string;
  overrideCrumbs?: Crumb[];
};

function categoryToRoute(cat?: string): {
  route: string | null;
  label: string | null;
} {
  if (!cat) {
    return { route: null, label: null };
  }

  const categoryName = String(cat).toLowerCase();

  if (categoryName.includes('phone')) {
    return { route: 'phones', label: 'Phones' };
  }

  if (categoryName.includes('tablet')) {
    return { route: 'tablets', label: 'Tablets' };
  }

  if (categoryName.includes('accessory')) {
    return { route: 'accessories', label: 'Accessories' };
  }

  if (categoryName.includes('favourites')) {
    return { route: 'favourites', label: 'Favourites' };
  }

  const label = String(cat)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, ch => String(ch).toUpperCase());
  const route = String(cat).toLowerCase().replace(/\s+/g, '-');

  return { route, label };
}

function formatBreadcrumbLabel(str: string) {
  if (!str) {
    return '';
  }

  const pretty = str.replace(/[-_]/g, ' ');

  return pretty.charAt(0).toUpperCase() + pretty.slice(1);
}

export const BreadCrumbs: React.FC<Props> = ({
  location,
  product,
  category,
  name,
  overrideCrumbs,
}) => {
  const crumbs = useMemo<Crumb[]>(() => {
    if (overrideCrumbs && overrideCrumbs.length) {
      return overrideCrumbs;
    }

    if (location && location.length) {
      const result: Crumb[] = [{ label: 'Home', to: '/' }];

      location.forEach(loc => {
        result.push({ label: formatBreadcrumbLabel(loc), to: `/${loc}` });
      });

      return result;
    }

    const result: Crumb[] = [{ label: 'Home', to: '/' }];
    const rawCategory = product?.category ?? category ?? '';
    const { route, label } = categoryToRoute(rawCategory);

    if (route && label) {
      result.push({ label, to: `/${route}` });
    }

    const productName = product?.name ?? name;

    if (productName) {
      result.push({ label: String(productName) });
    }

    return result;
  }, [category, location, name, overrideCrumbs, product]);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className={styles.breadcrumb__inner}>
        <ul className={styles.breadcrumb__list}>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            const key = crumb.to ? String(crumb.to) : `crumb-${index}`;

            return (
              <li key={key} className={styles.breadcrumb__item}>
                {index > 0 && (
                  <span
                    className={styles.breadcrumb__separator}
                    aria-hidden="true"
                  >
                    <ChevronIcon direction="left" />
                  </span>
                )}

                {index === 0 ? (
                  <Link
                    to={crumb.to ?? '/'}
                    className={styles.breadcrumb__home}
                    aria-label="Home"
                  >
                    <HomeIcon className={styles.breadcrumb__icon} />
                  </Link>
                ) : crumb.to && !isLast ? (
                  <Link to={crumb.to} className={styles.breadcrumb__link}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(styles.breadcrumb__link, {
                      [styles['breadcrumb__link--active']]: isLast,
                    })}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
