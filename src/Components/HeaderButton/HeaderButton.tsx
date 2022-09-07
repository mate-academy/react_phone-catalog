import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './HeaderButton.scss';

type Props = {
  link: string,
  name: string,
  totalQty: number,
};

export const HeaderButton: React.FC<Props> = ({ link, name, totalQty }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return classNames(
          'HeaderButton',
          { 'HeaderButton--active': isActive },
        );
      }}
    >
      <div className={`HeaderButton__icon HeaderButton__icon--${name}`}>
        {totalQty !== 0 && (
          <span className="HeaderButton__count">{totalQty}</span>
        )}
      </div>
    </NavLink>
  );
};
