import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { TopActionsNav } from '../../types/PageType';
import { useAppSelector } from '../../app/hooks';
import './TopActionsBar.scss';

type Props = {
  type: TopActionsNav,
};

export const TopActionsBar: React.FC<Props> = ({ type }) => {
  const {
    favorites,
    cart,
  } = useAppSelector(state => state.favoriteAndCartProducts);

  const isFavorites = type === 'favorites';
  const isCart = type === 'cart';

  const counter = isFavorites ? favorites : cart;

  return (
    <div className={classNames(
      'top-actions__item',
      {
        'top-actions__item--favorite': isFavorites,
        'top-actions__item--cart': isCart,
      },
    )}
    >
      <NavLink
        to={type}
        className={({ isActive }) => classNames(
          'top-actions__link',
          { 'top-actions__link--active': isActive },
        )}
      >
        <Icon type={isFavorites
          ? IconType.FAVORITE
          : IconType.CART}
        />

        {!!counter.length && (
          <span className="top-actions__item-count">
            {counter.length}
          </span>
        )}
      </NavLink>
    </div>
  );
};
