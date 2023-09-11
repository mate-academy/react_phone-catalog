import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { getTitle } from '../../helpers/getTitle';

export const HistoryLocation = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnameSegmets = pathname.split('/')
    .filter(segment => segment !== '');

  const historyLocation = pathnameSegmets.map((segment, index) => {
    const link = `/${pathnameSegmets.slice(0, index + 1).join('/')}`;

    return { label: segment, link };
  });

  return (
    <nav className="history-location">
      <Link
        to="/"
        className="history-location--link"
      />

      <ul className="history-location__list">
        {historyLocation.map((currentHistory, index) => {
          const title = getTitle(currentHistory.label);

          return (
            <li
              className="history-location--item"
              key={currentHistory.label}
            >
              <div className="history-location--arrow-right" />

              <Link
                to={currentHistory.link}
                className={classNames('history-location',
                  {
                    'history-location-active':
                    index === historyLocation.length - 1,
                  })}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
