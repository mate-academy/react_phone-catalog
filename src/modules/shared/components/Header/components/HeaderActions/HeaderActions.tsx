/* eslint-disable prettier/prettier */

import iconFarourites from '/img/header_icon-favourites.svg';
import iconBag from '/img/header_icon-bag.svg';
import iconMenu from '/img/header_icon-menu.svg';
import styles from './HeaderActions.module.scss';

const {
  actions,
  actionItem,
  actionItemIcon,
  actionItemCount,
  actionItemMenu,
} = styles;

const favouritesCount = 14;
const bagCount = 88;

export const HeaderActions = () => {
  return (
    <div className={actions}>
      <a className={actionItem}>
        <img src={iconFarourites} className={actionItemIcon} alt="Fav Icon" />
        {favouritesCount > 0 && (
          <span className={actionItemCount}>{favouritesCount}</span>
        )}
      </a>

      <a className={actionItem}>
        <img src={iconBag} className={actionItemIcon} alt="Bag Icon" />
        {bagCount > 0 && <span className={actionItemCount}>{bagCount}</span>}
      </a>

      <a className={actionItemMenu}>
        <img src={iconMenu} className={actionItemIcon} alt="Menu Icon" />
      </a>
    </div>
  );
};
