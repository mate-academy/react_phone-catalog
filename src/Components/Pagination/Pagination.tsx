import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SlideLeftButton } from '../SlideLeftButton';
import { SlideRightButton } from '../SlideRightButton';
import './Pagination.scss';
import { SearchParams } from '../../types/Categories';
import { getNumbers } from '../../helpers/helpers';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  currentPage: number,
  pagesAmount: number,
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  pagesAmount,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = getNumbers(1, pagesAmount);
  const handlePageLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSlideLeft = () => {
    setSearchParams(
      getSearchWith({
        [SearchParams.Page]: `${currentPage - 1}`,
      }, searchParams),
    );
    handlePageLinkClick();
  };

  const handleSlideRight = () => {
    setSearchParams(
      getSearchWith({
        [SearchParams.Page]: `${currentPage + 1}`,
      }, searchParams),
    );
    handlePageLinkClick();
  };

  return (
    <div className="Pagination" data-cy="pagination">
      <SlideLeftButton
        onSlideLeft={handleSlideLeft}
        isDisabled={currentPage === 1}
      />

      <div className="Pagination__pages">
        {pages.map(page => (
          <Link
            to={{
              search: getSearchWith({
                [SearchParams.Page]: page.toString(),
              }, searchParams),
            }}
            key={page}
            className={classNames('Pagination__pages-link', {
              active: currentPage === page,
            })}
            onClick={handlePageLinkClick}
          >
            {page}
          </Link>
        ))}
      </div>

      <SlideRightButton
        onSlideRight={handleSlideRight}
        isDisabled={currentPage === pages.length}
      />
    </div>
  );
};
