import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './Pagination.scss';
import { MyNavButton } from '../UI/MyNavButton';
import { Navigation } from '../../types/navigation';
import { getSearchParamsWith } from '../../helpers/searchParams';
import { Params } from '../../types/searchParams';

type Props = {
  paginationButtons: number[];
};

export const Pagination: React.FC<Props> = ({ paginationButtons }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || 1);

  function setParamsWith(params: Params) {
    const newParams = getSearchParamsWith(params, searchParams);

    setSearchParams(newParams);
  }

  return (
    <nav className="pagination" data-cy="pagination">
      <ul className="pagination__list">
        <li className="pagination__nav" data-cy="paginationLeft">
          <MyNavButton
            direction={Navigation.left}
            disabled={page === 1}
            onClick={() => setParamsWith({ page: page - 1 })}
          />
        </li>

        <h2 className="pagination__mobile">{`${page} out of ${paginationButtons.length}`}</h2>

        <div className="pagination__button-list">
          {paginationButtons.map(item => (
            <li key={item}>
              <Link
                to={{
                  search: getSearchParamsWith({ page: item }, searchParams),
                }}
                className={classNames('pagination__link', {
                  'pagination__link--active': page === item,
                })}
              >
                {item}
              </Link>
            </li>
          ))}
        </div>

        <li className="pagination__nav" data-cy="paginationRight">
          <MyNavButton
            direction={Navigation.right}
            disabled={page === paginationButtons.length}
            onClick={() => setParamsWith({ page: page + 1 })}
          />
        </li>
      </ul>
    </nav>
  );
};
