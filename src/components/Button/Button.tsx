import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './style.scss';

type Props = {
  purpose: string;
  count: number;
};

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('button', {
  'button--active': isActive,
});

export const Button: React.FC<Props> = ({ purpose, count }) => {
  return (
    <NavLink to={`/${purpose}`} className={getLinkClass}>
      <img
        src={`./icons/${purpose}.svg`}
        alt={purpose}
        className="button__img"
      />
      {count > 0 && <span className="button__count">{count}</span>}
    </NavLink>
  );
};
