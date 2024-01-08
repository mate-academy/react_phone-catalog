/* eslint-disable no-console */
/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';
import { Badge } from '../Badge';

type Props = {
  type: string;
  styleName?: string | '';
  isActive?: boolean;
};
export const HeaderIcon: React.FC<Props> = ({ type, styleName, isActive }) => {
  const setClass = () => {
    let result = 'pt-6 pr-6 pl-6 pb-[19px]';

    if (isActive) {
      result = `${result} active-icon`;
    }

    if (styleName) {
      result = `${result} ${styleName}`;
    }

    return result;
  };

  return (
    <NavLink
      to={type}
      className="relative"
    >
      <img
        key={type}
        className={setClass()}
        src={`./img/svg/${type}.svg`}
        alt={type}
      />
      <Badge type={type} />
    </NavLink>
  );
};
