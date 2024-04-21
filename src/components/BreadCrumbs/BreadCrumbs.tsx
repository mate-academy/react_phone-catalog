import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { getLinkName } from '../../helpers/getLinkName';
import { Colors } from '../../types/Colors';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const links = pathname.split('/').filter(link => link !== '');

  return (
    <ul className="breadcrumbs" data-cy="breadCrumbs">
      <li>
        <Link to="/" className="breadcrumbs__link">
          <Icon iconType={IconType.home} />
        </Link>
      </li>

      {links.map((link, index) => {
        return (
          <li
            key={link}
            className={classNames('breadcrumbs__link', {
              'breadcrumbs__link--current': index === links.length - 1,
            })}
          >
            <Icon iconType={IconType.arrowRight} color={Colors.disabled} />

            <Link
              to={`/${links.slice(0, index + 1).join('/')}`}
            >
              <span className="breadcrumbs__text">
                {getLinkName(link)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
