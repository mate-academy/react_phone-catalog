import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import navStyles from './Navigation.module.scss';

import phones from '@/shared/api/phones.json';
import tablets from '@/shared/api/tablets.json';
import accessories from '@/shared/api/accessories.json';
import { useTranslation } from 'react-i18next';

type Props = {
  listClassName?: string;
  itemClassName?: string;
  onNavigate?: () => void;
};

export const Navigation: React.FC<Props> = ({
  listClassName,
  itemClassName,
  onNavigate,
}) => {
  const { t } = useTranslation();
  const { productId } = useParams();

  const allProducts = [...phones, ...tablets, ...accessories];

  const currentProduct = allProducts.find(product => product.id === productId);

  const activeCategory = currentProduct?.category;

  return (
    <ul className={classNames(navStyles.navList, listClassName)}>
      <li className={classNames(navStyles.navItem, itemClassName)}>
        <NavLink
          onClick={onNavigate}
          to="/"
          end
          className={({ isActive }) =>
            classNames(
              navStyles.navLink,
              isActive && navStyles['navLink--active'],
            )
          }
        >
          {t('header.home')}
        </NavLink>
      </li>

      <li className={classNames(navStyles.navItem, itemClassName)}>
        <NavLink
          onClick={onNavigate}
          to="/phones"
          end
          className={({ isActive }) =>
            classNames(
              navStyles.navLink,
              (isActive || activeCategory === 'phones') &&
                navStyles['navLink--active'],
            )
          }
        >
          {t('header.phones')}
        </NavLink>
      </li>
      <li className={classNames(navStyles.navItem, itemClassName)}>
        <NavLink
          onClick={onNavigate}
          to="/tablets"
          end
          className={({ isActive }) =>
            classNames(
              navStyles.navLink,
              (isActive || activeCategory === 'tablets') &&
                navStyles['navLink--active'],
            )
          }
        >
          {t('header.tablets')}
        </NavLink>
      </li>

      <li className={classNames(navStyles.navItem, itemClassName)}>
        <NavLink
          onClick={onNavigate}
          to="/accessories"
          end
          className={({ isActive }) =>
            classNames(
              navStyles.navLink,
              (isActive || activeCategory === 'accessories') &&
                navStyles['navLink--active'],
            )
          }
        >
          {t('header.accessories')}
        </NavLink>
      </li>
    </ul>
  );
};
