import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon }
  from '../assets/images/icons/home-icon.svg';
import { ReactComponent as Arrow }
  from '../assets/images/icons/arrow-right.svg';

type Props = {
  location: string;
};

const BreadCrumbs: React.FC<Props> = ({ location }) => {
  const path = location.split('/').filter(x => x);

  return (
    <div className="BreadCrumps">
      <Link
        to="/"
        className="BreadCrumps__link"
      >
        <div className="BreadCrumps__homeIconContainer">
          <HomeIcon className="BreadCrumps__homeIcon" />
        </div>
      </Link>
      <Arrow className="BreadCrumps__arrow" />
      {path.map(route => (
        <div key={route} className="BreadCrumps__linkContainer">
          <Link
            className={classNames(
              'BreadCrumps__link',
              {
                'BreadCrumps__link--disabled': route === path[path.length - 1],
              },
            )}
            to={`/${route}`}
          >
            {route.charAt(0).toUpperCase() + route.slice(1)}
          </Link>
          {!(route === path[path.length - 1])
          && <Arrow className="BreadCrumps__arrow" />}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
