import { NavLink } from 'react-router-dom';
import s from './Action.module.scss';
import { useShopContext } from '../../context/ShopContext/ShopContext';
// eslint-disable-next-line max-len
import { useFavouriteContext } from '../../context/ShopContext/FavoutiteContext';

type Props = {
  setMenuIsOpen: (v: boolean) => void;
};

export const Action: React.FC<Props> = ({ setMenuIsOpen }) => {
  const { inCart } = useShopContext();
  const { liked } = useFavouriteContext();

  const totalAmount = inCart.reduce(function (accum, current) {
    return accum + current.quantity;
  }, 0);

  return (
    <div className={s.action}>
      <NavLink
        to="/favourite"
        className={({ isActive }) =>
          isActive
            ? `${s.action__favourites} ${s['action__favourites--active']}`
            : `${s.action__favourites}`
        }
        onClick={() => setMenuIsOpen(false)}
      >
        <div className={`${s.action__icon} ${s['action__icon--like']} `}>
          <div className={s.action__counter}>{liked.length}</div>
        </div>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive
            ? `${s['action__shopping-bag']} ${s['action__shopping-bag--active']}`
            : `${s['action__shopping-bag']}`
        }
        onClick={() => setMenuIsOpen(false)}
      >
        <div className={`${s.action__icon} ${s['action__icon--bag']} `}>
          <div className={s.action__counter}>{totalAmount}</div>
        </div>
      </NavLink>
    </div>
  );
};
