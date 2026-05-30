import styles from './Breadcrumbs.module.scss';
import { IconType } from '../../types/IconType';
import { Icon } from '../Icon/Icon';
import { CategoryType } from '../../types/CategoryType';
import { NavLink } from 'react-router-dom';

type Props = {
  category: CategoryType | undefined;
  itemId?: string | undefined;
};

export const Breadcrumbs: React.FC<Props> = ({ category, itemId }) => {
  return (
    <div className={styles.breadcrumps__container}>
      <Icon iconType={IconType.Home} address="/" />
      <Icon iconType={IconType.Right} address="" />
      {category && (
        <NavLink to={`/${category.page}`} className={styles.breadcrumps__link}>
          <span>{category.name}</span>
        </NavLink>
      )}

      {itemId && (
        <>
          <Icon iconType={IconType.Right} address="" />
          <span>{itemId}</span>
        </>
      )}
    </div>
  );
};
