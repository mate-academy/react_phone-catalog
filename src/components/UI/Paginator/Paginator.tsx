import React, { memo, useMemo } from 'react';

import './Paginator.scss';
import ArrowButton from '../ArrowButton';

interface Props {
  itemsAmount: number,
  itemsPerPage: number,
  currentPage: number,
  onChange: (pageIndex: number) => void,
  className?: string,
}

export const Paginator: React.FC<Props> = memo(({
  itemsAmount,
  itemsPerPage,
  currentPage,
  onChange,
  className,
}) => {
  const pageIndexes = useMemo(() => {
    const pagesAmount = Math.ceil((itemsAmount || 1) / itemsPerPage);

    return Array.from({ length: pagesAmount }, (_, i) => i + 1);
  }, [itemsPerPage, itemsAmount]);

  if (pageIndexes.length === 0) return <></>;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageIndexes.length;

  return (
    <div className={`paginator ${className || ''}`}>
      <ArrowButton
        onClick={() => onChange(currentPage - 1)}
        disabled={isFirstPage}
      />

      <ul className='paginator__list'>
        {pageIndexes.map(pageIndex => (
          <PaginatorItem
            key={pageIndex}
            pageIndex={pageIndex}
            onChange={onChange}
            isActive={currentPage === pageIndex}
          />
        ))}
      </ul>
      
      <ArrowButton
        onClick={() => onChange(currentPage + 1)}
        disabled={isLastPage}
        rotate={180}
      />
    </div>
  );
});

interface ItemProps {
  pageIndex: number,
  onChange: (pageIndex: number) => void,
  isActive?: boolean,
}

const PaginatorItem: React.FC<ItemProps> = memo(({
  pageIndex,
  onChange,
  isActive,
}) => {
  const activeClass = isActive ? 'paginator__item--active' : '';

  return (
    <li
      className={`paginator__item ${activeClass}`}
      onClick={() => onChange(pageIndex)}
    >
      {pageIndex}
    </li>
  )
})
