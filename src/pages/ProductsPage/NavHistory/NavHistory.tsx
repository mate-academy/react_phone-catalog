import classNames from 'classnames';
import { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HistoryStepIcon } from 'src/components/Icons/HistoryStepIcon';
import { HomeIcon } from 'src/components/Icons/HomeIcon';
import { ProductContext } from 'src/contexts/ProductContext';
import './NavHistory.scss';

type Props = {
  pageType: string,
};

export const NavHistory: FC<Props> = ({
  pageType,
}) => {
  const location = useLocation();
  const { selectedProductDetails } = useContext(ProductContext);
  const historyOfSteps = location.pathname.split('/').filter(el => !!el);
  const numberOfSteps = historyOfSteps.length;
  const activeLink = historyOfSteps.at(-1);
  const prevHistorySteps = historyOfSteps.join('/');

  return (
    <nav className="nav-history">
      <ul className="nav-history__list" data-cy="breadCrumbs">
        <li className="nav-history__item">
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>

        {!!numberOfSteps && historyOfSteps.map((step) => {
          const renderedStep = step.split('-').filter(x => !!x).length > 1
            ? selectedProductDetails?.name
            : step[0].toUpperCase() + step.slice(1);

          return (
            <ul className="nav-history__list" key={step}>
              <li>
                <HistoryStepIcon />
              </li>
              <li>
                <Link
                  to={step === pageType
                    ? `/${pageType}`
                    : `/${prevHistorySteps}`}
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
