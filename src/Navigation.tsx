import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  pathname: string,
};

export const Navigation: React.FC<Props> = ({ pathname }) => {
  const nav = pathname.split('/');

  return (
    <div className="navigation">
      <div className="navigation__icon" />
      <div className="navigation__location">

        <div className="navigation__arrow" />
        <NavLink
          className={classNames(
            'navigation__link',
            { 'navigation__link--active': pathname.slice(1) === nav[1] },
          )}
          to={`/${nav[1]}`}
        >
          {nav[1][0].toUpperCase() + nav[1].slice(1)}
        </NavLink>

        {nav[2] !== undefined && (
          <>
            <div className="navigation__arrow" />
            <div
              className={classNames(
                'navigation__link',
                {
                  'navigation__link--active':
                  pathname.split('/')[2] === nav[2],
                },
              )}
            >
              {nav[2][0].toUpperCase() + nav[2].slice(1)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
