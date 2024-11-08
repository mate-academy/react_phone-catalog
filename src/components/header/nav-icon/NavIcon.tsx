import { FC, ReactNode, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import cn from 'classnames';

import { Labels } from '@utils/types/labels.enum';

import styles from './NavIcon.module.scss';

type TProps = {
  text: string;
  products: number;
  ROUTE: string;
  children: ReactNode;
  onIconClick?: () => void;
};

export const NavIcon: FC<TProps> = memo(
  ({ text, products, ROUTE, children, onIconClick }) => {
    const { t } = useTranslation();

    const hasProducts = !!products;
    const isFavorite = text === Labels.Favourite;
    const localType = t(`nav.productTypes.${text}`);
    const localTitle = t('nav.link.title', {
      productType: localType,
    });
    const localAria = t('nav.link.aria', { productType: localType });

    return (
      <NavLink
        to={ROUTE}
        className={({ isActive }) =>
          cn(styles.navIcon, { [styles.active]: isActive })
        }
        onClick={onIconClick}
        title={localTitle}
        aria-label={localAria}
      >
        <div className={styles.wrapper}>
          {children}
          {hasProducts && (
            <span
              className={cn(styles.count, {
                [styles.countFavorite]: isFavorite,
              })}
            >
              {products}
            </span>
          )}
        </div>
      </NavLink>
    );
  },
);
