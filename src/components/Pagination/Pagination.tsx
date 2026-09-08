import classNames from 'classnames';
import { Button } from '../Button';
import './Pagination.scss';
import { scrollToTop } from '../../utils/scrollToTop';

type Props = {
  page: number;
  totalPages: number;
  onChange: (pageNum: number) => void;
};

export const Pagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  const createPageList = () => {
    const pages: (number | '...')[] = [];

    pages.push(1);

    if (page > 3) {
      pages.push('...');
    }

    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < totalPages) {
        pages.push(p);
      }
    }

    if (page < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageList();

  return (
    <div className="pagination">
      <Button
        className={classNames('button pag__btn--left', {
          'is-active': page !== 1,
        })}
        disabled={page === 1}
        onClick={() => {
          onChange(page - 1);
          scrollToTop();
        }}
      />
      {pages.map((p, i) => (
        <Button
          key={i}
          className={classNames('pag__btn', {
            'pag__btn--active': p === page,
            'pag__btn--dots': p === '...',
          })}
          disabled={p === '...'}
          onClick={() => {
            typeof p === 'number' && onChange(p);
            scrollToTop();
          }}
        >
          {p}
        </Button>
      ))}
      <Button
        className={classNames('button pag__btn--right', {
          'is-active': page !== totalPages,
        })}
        disabled={page === totalPages}
        onClick={() => {
          onChange(page + 1);
          scrollToTop();
        }}
      />
    </div>
  );
};
