import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HistoryStepIcon } from 'src/components/Icons/HistoryStepIcon';
import { HomeIcon } from 'src/components/Icons/HomeIcon';
import { lower } from 'src/utils/helpers';

type Props = {
  pageType: string,
};

export const NavHistory: FC<Props> = ({
  pageType,
}) => {
  const location = useLocation();
  const historyOfSteps = location.pathname.split('/').filter(el => !!el);
  const numberOfSteps = historyOfSteps.length;
  const activeLink = historyOfSteps.at(-1);

  return (
    <nav className="nav-history">
      <ul className="nav-history__list">
        <li className="nav-history__item">
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>

        {!!numberOfSteps && historyOfSteps.map((step) => {
          const isCurrentPage = lower(step) === lower(pageType);
          const renderedStep = step.split('-').map(el => {
            return el[0].toUpperCase() + el.slice(1).toLowerCase();
          }).join(' ');

          const prevHistorySteps = historyOfSteps.join('/');
          const nextHistoryStep = !isCurrentPage
            && !historyOfSteps.includes(step)
            && `/${step}`;

          return (
            <ul className="nav-history__list" key={step}>
              <li>
                <HistoryStepIcon />
              </li>
              <li>
                <Link
                  to={step === pageType
                    ? `/${pageType}`
                    : `/${prevHistorySteps}${nextHistoryStep || ''}`}
                  className={classNames(
                    'nav-history__item',
                    { 'nav-history__item--active': step === activeLink },
                  )}
                >
                  {renderedStep}
                </Link>
              </li>
            </ul>
          );
        })}
      </ul>
    </nav>
  );
};
