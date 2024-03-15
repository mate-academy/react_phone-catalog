import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { IconName } from '../Icon/common';

import './HeaderIconLink.scss';

type Props = {
  iconName: IconName;
  linkTo: string;
  classNames?: string;
  hasItemsIn?: boolean;
  count?: number;
  onClick?: () => void
};

export const HeaderIconLink: React.FC<Props> = ({
  iconName,
  linkTo,
  classNames,
  hasItemsIn,
  count,
  onClick = () => { },
}) => {
  return (
    <NavLink
      to={linkTo}
      className={cn('icon-link', classNames)}
      onClick={onClick}
    >
      <div className="icon-link__icon-container">
        <Icon
          iconName={iconName}
          classNames="icon-link__icon"
        />

        {hasItemsIn && (
          <span className="icon-link__icon-count">
            {count}
          </span>
        )}
      </div>
    </NavLink>
  );
};
