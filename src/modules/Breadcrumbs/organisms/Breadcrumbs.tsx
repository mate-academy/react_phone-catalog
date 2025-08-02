import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import styles from './../Breadcrumbs.module.scss';
import { SearchField } from '../../shared/molecules/SearchField';
import { generateDeviceModel } from '../../../helpers/generateDeviceModel';
import { useAppSelector } from '../../../hooks/hooks';
import {
  BreadcrumbHomeIcon,
  BreadcrumbArrowIcon,
  BreadcrumbText,
} from '../atoms';
import { BreadcrumbItem, BreadcrumbLink } from '../molecules';

type Props = {
  showSearch?: boolean;
};

export const Breadcrumbs: React.FC<Props> = ({ showSearch = false }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { productId } = useParams();
  const pathnames = pathname.split('/').filter(Boolean);
  const isHomePage = pathname === '/';

  const { products, loading } = useAppSelector(state => state.products);
  const product = products?.find(p => p?.itemId === productId);
  const category = product?.category || '';
  const productModel = generateDeviceModel(productId || '');

  if (['/cart', '/', '/home'].includes(pathname)) return null;

  return (
    <div aria-label="Breadcrumb" className={styles.breadcrumbs}>
      {!loading && (
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            {!isHomePage && (
              <BreadcrumbItem clickable>
                <BreadcrumbLink to="/">
                  <BreadcrumbHomeIcon />
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}

            {product ? (
              <>
                <BreadcrumbItem clickable>
                  <BreadcrumbArrowIcon />
                  <BreadcrumbLink to={`/${category}`}>
                    {t(`breadcrumbs.${category}.title`)}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbArrowIcon />
                  <BreadcrumbText isCurrent>
                    {product?.name} ({productModel})
                  </BreadcrumbText>
                </BreadcrumbItem>
              </>
            ) : (
              pathnames.map((name, index) => {
                const isLast = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                  <BreadcrumbItem clickable={!isLast} key={to}>
                    <BreadcrumbArrowIcon />
                    {isLast ? (
                      <BreadcrumbText isCurrent>
                        {t(`breadcrumbs.${name}.title`)}
                      </BreadcrumbText>
                    ) : (
                      <BreadcrumbLink to={to}>
                        {t(`breadcrumbs.${name}.title`)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                );
              })
            )}
          </ul>
          {showSearch && <SearchField />}
        </nav>
      )}
    </div>
  );
};
