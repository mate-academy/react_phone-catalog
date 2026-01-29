import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../Icon';
import { capitalizePhase } from '../../../../mocks/Functions/functions';

interface Props {
  title?: string;
  additionalClass?: string;
}

export const CurrentPath: React.FC<Props> = ({
  title = '',
  additionalClass,
}) => {
  const location = useLocation();
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    const parts = location.pathname
      .split('/')
      .filter(elem => elem !== '')
      .map(elem => capitalizePhase(elem));

    if (title) {
      parts[parts.length - 1] = title;
    }

    setPath(parts);
  }, [location, title]);

  return (
    <div className={cn('currentPath', additionalClass)}>
      <Link to="/home" className="currentPath__link currentPath__link--home">
        <Icon iconSlug="Home" />
      </Link>

      {path.map(elem => {
        return (
          <React.Fragment key={elem}>
            <Link to="../home" className="currentPath__link">
              <Icon iconSlug="ChevronRight" />
            </Link>
            <Link to={`/${elem}`} className="currentPath__title">
              {elem}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};
