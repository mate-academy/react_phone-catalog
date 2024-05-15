import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers: number[] = [];

  // eslint-disable-next-line no-console
  console.log('entered');

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((page: number) => (
        <button
          className={classNames('pagination__page', {
            'pagination__page--active': currentPage === page,
          })}
          onClick={() => setCurrentPage(page)}
          key={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
