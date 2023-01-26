import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { IconButton } from '../IconButton';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { goToTop } from '../../utils/goToTop';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./Pagination.module.scss');

const {
  Pagination: pagination,
  Pagination__list: list,
} = styles;

type Props = {
  className?: string;
  total: number;
};

export const Pagination: FC<Props> = ({
  className = '',
  total,
}) => {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('itemsOnPage')) || +ItemsOnPage.four;

  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [pages, setPages] = useState<number[]>([]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages[pages.length - 1];

  const getNumbers = (from: number, to: number) => {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  };

  useEffect(() => {
    setPages(getNumbers(1, Math.ceil(total / perPage)));
  }, [total, perPage]);

  useEffect(() => {
    if (pages.length < 5) {
      setVisiblePages(pages);

      return;
    }

    if (isLastPage) {
      setVisiblePages(pages.slice(pages.length - 4));

      return;
    }

    if (pages.slice(0, 3).includes(currentPage)) {
      setVisiblePages(pages.slice(0, 4));
    } else {
      setVisiblePages(pages.slice(currentPage - 3, currentPage + 1));
    }
  }, [perPage, currentPage, pages]);

  return (
    <div
      className={cn(
        pagination,
        className,
      )}
    >
      <IconButton
        arrow={{ direction: 'left', disabled: isFirstPage }}
        onClick={goToTop}
        link={{ params: { page: `${currentPage - 1}` } }}
      />

      <ul
        className={list}
      >
        {visiblePages.map(page => (
          <li
            key={page}
          >
            <IconButton
              page={{ number: page, selected: page === currentPage }}
              onClick={goToTop}
              link={{ params: { page: `${page}` } }}
            />
          </li>
        ))}
      </ul>

      <IconButton
        arrow={{ direction: 'right', disabled: isLastPage }}
        onClick={goToTop}
        link={{ params: { page: `${currentPage + 1}` } }}
      />
    </div>
  );
};

Pagination.defaultProps = {
  className: '',
};
