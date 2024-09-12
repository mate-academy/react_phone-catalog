/* eslint-disable @typescript-eslint/indent */
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import icons from '../../../shared/styles/icons.module.scss';
import { Button, ButtonTheme } from '../../../shared/ui/forms';
import cls from './paginationProducts.module.scss';

interface Props {
  className?: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationProducts: FC<Props> = ({
  onPageChange,
  totalPages,
  currentPage,
}) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateMaxVisiblePages = () => {
      const width = window.innerWidth;

      if (width < 400) {
        setIsSmallScreen(true);
        setMaxVisiblePages(3); // Показуємо лише 3 сторінки на маленькому екрані
      } else if (width < 640) {
        setIsSmallScreen(false);
        setMaxVisiblePages(5);
      } else if (width < 1000) {
        setIsSmallScreen(false);
        setMaxVisiblePages(8);
      } else {
        setIsSmallScreen(false);
        setMaxVisiblePages(18);
      }
    };

    updateMaxVisiblePages();
    window.addEventListener('resize', updateMaxVisiblePages);

    return () => {
      window.removeEventListener('resize', updateMaxVisiblePages);
    };
  }, []);

  const getPaginationRange = () => {
    const totalNumbers = maxVisiblePages;
    const halfTotalNumbers = Math.floor(totalNumbers / 2);

    let startPage = Math.max(2, currentPage - halfTotalNumbers);
    let endPage = Math.min(totalPages - 1, currentPage + halfTotalNumbers);

    if (isSmallScreen) {
      startPage = Math.max(2, currentPage - 1);
      endPage = Math.min(totalPages - 1, currentPage + 1);
    }

    if (endPage - startPage + 1 < totalNumbers && startPage > 2) {
      startPage = Math.max(2, endPage - totalNumbers + 1);
    }

    if (endPage - startPage + 1 < totalNumbers && endPage < totalPages - 1) {
      endPage = Math.min(totalPages - 1, startPage + totalNumbers - 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const paginationRange = getPaginationRange();

  const onClickHandler = (item: number) => {
    if (item >= 1 && item <= totalPages) {
      onPageChange(item);
    }
  };

  return (
    <div className={cls.paginationProducts}>
      <Button
        className={classNames(classNames(cls.left, icons['_icon-arrow']))}
        theme={ButtonTheme.SQUARE}
        onClick={() => onClickHandler(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className={cls.pages}>
        <Button
          theme={
            currentPage === 1 ? ButtonTheme.SQUARE_DEFAULT : ButtonTheme.SQUARE
          }
          onClick={() => onClickHandler(1)}
        >
          {1}
        </Button>

        {paginationRange[0] > 2 && !isSmallScreen && (
          <Button theme={ButtonTheme.SQUARE} disabled>
            {'...'}
          </Button>
        )}

        {paginationRange.map(item => (
          <Button
            key={item}
            theme={
              currentPage === item
                ? ButtonTheme.SQUARE_DEFAULT
                : ButtonTheme.SQUARE
            }
            onClick={() => onClickHandler(item)}
          >
            {item}
          </Button>
        ))}

        {paginationRange[paginationRange.length - 1] < totalPages - 1 &&
          !isSmallScreen && (
            <Button theme={ButtonTheme.SQUARE} disabled>
              {'...'}
            </Button>
          )}

        {totalPages > 1 && (
          <Button
            theme={
              currentPage === totalPages
                ? ButtonTheme.SQUARE_DEFAULT
                : ButtonTheme.SQUARE
            }
            onClick={() => onClickHandler(totalPages)}
          >
            {totalPages}
          </Button>
        )}
      </div>

      <Button
        className={classNames(cls.right, icons['_icon-arrow'])}
        theme={ButtonTheme.SQUARE}
        onClick={() => onClickHandler(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
