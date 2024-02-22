import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchParams';
import { Icon } from '../../types/Icons';
import { ButtonSquare } from '../ButtonSquare/ButtonSquare';
import './Pagination.scss';

const range = (start: number, end: number): string[] => {
  const result: string[] = [];

  for (let i = start; i <= end; i += 1) {
    result.push(i.toString());
  }

  return result;
};

type Props = {
  pagesAmount: number,
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  pagesAmount,
  currentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = range(1, pagesAmount);

  const handleGoToNext = () => {
    setSearchParams(
      getSearchWith({
        page: `${currentPage + 1}`,
      }, searchParams),
    );
  };

  const handleGoToPrev = () => {
    setSearchParams(
      getSearchWith({
        page: `${currentPage - 1}`,
      }, searchParams),
    );
  };

  return (
    <div
      className="pagination"
      data-cy="pagination"
    >
      <ButtonSquare
        icon={Icon.ArrowLeft}
        onAction={handleGoToPrev}
        isDisabled={currentPage === 1}
        data-cy="paginationLeft"
      />

      <ul className="pagination__pages">
        {pages.map(page => (
          <li
            key={page}
            className={classNames('pagination__page', {
              'pagination__page--active': currentPage === +page,
            })}
          >
            <Link
              className={classNames('pagination__link', {
                'pagination__link--active': currentPage === +page,
              })}
              to={{
                search: getSearchWith({
                  page,
                }, searchParams),
              }}
            >
              <span>
                {page}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <ButtonSquare
        icon={Icon.ArrowRigt}
        onAction={handleGoToNext}
        isDisabled={currentPage === pagesAmount}
        data-cy="paginationRight"
      />
    </div>
  );
};
