import { NavLink } from 'react-router-dom';
import { capitalize } from '../../helpers/utils';

import './CategoryList.scss';

type Props = {
  type: string;
  amount: number;
};

export const CategoryLink: React.FC<Props> = ({ type, amount }) => {
  const path = `/${type}`;
  const title = capitalize(type);

  return (
    <div className="CategoryLink">
      <NavLink
        to={path}
        className={`CategoryLink__img CategoryLink__img--${type}`}
      >
        {' '}
      </NavLink>

      <div className="CategoryLink__text">
        <NavLink
          to={path}
          className="CategoryLink__title"
        >
          {title}
        </NavLink>

        <p className="CategoryLink__amount">
          {`${amount} model${amount !== 1 ? 's' : ''}`}
        </p>
      </div>

    </div>
  );
};
