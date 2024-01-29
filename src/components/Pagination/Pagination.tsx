/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import './pagination.scss';

type Props = {
  productsListLenth: number,
  itemsOnPage: string,
  currentPage: number,
  onPageChange: (value: number) => void,
};

export const Pagination: React.FC<Props> = ({
  productsListLenth,
  itemsOnPage,
  currentPage,
  onPageChange,
}) => {
  const [paginationPages, setPaginationPages] = useState<number[]>([]);

  const getNumberPages = () => {
    return Math.ceil(productsListLenth / +itemsOnPage);
  };

  useEffect(() => {
    getNumberPages();
    const pages = Array.from({ length: getNumberPages() }, (_, i) => i + 1);

    setPaginationPages(pages);
  }, [productsListLenth, itemsOnPage]);

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__item previous"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <ul className="pagination__buttons">
        {paginationPages.map(page => (
          <li className="pagination__item" key={page}>
            <button
              type="button"
              className="pagination__button"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pagination__item next"
        disabled={currentPage === paginationPages.length}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};
