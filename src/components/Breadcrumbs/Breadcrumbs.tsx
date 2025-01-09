import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import themeStyles from '../../styles/utils/themeStyles';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import './Breadcrumbs.scss';
import { usePathSegments } from '../../hooks/usePathSegments';

export const Breadcrumbs = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const navigate = useNavigate();

  const pathSegments = usePathSegments();

  const handleBreadcrumbClick = (index: number) => {
    const pathTo = `/${pathSegments.slice(0, index + 1).join('/')}`;

    navigate(pathTo);
  };

  const { home, disabledArrow } = themeStyles(currentTheme === 'light-theme');

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__item">
        <img src={home} alt="Home icon" className="icon" />
      </Link>

      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const formattedSegment =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={index} className="breadcrumbs__segment">
            <img src={disabledArrow} alt="Breadcrumb arrow" className="icon" />

            <button
              className={classNames('breadcrumbs__item small-text', {
                'small-text-gray': isLast,
              })}
              disabled={isLast}
              onClick={() => handleBreadcrumbClick(index)}
            >
              {formattedSegment}
            </button>
          </div>
        );
      })}
    </div>
  );
};
