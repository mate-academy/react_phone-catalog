import classNames from 'classnames';
import './Pagination.scss';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  pages: number;
  currentPage: string;
  setPage: (v: string) => void;
};

export const Pagination: React.FC<Props> = ({
  pages,
  currentPage,
  setPage,
}) => {
  const firstBlock = 0;
  const lastBlock = pages / 4 - 1;

  const pagesArray = Array.from({ length: pages }, (_, index) =>
    (1 + index).toString(),
  );

  const [currentBlock, setCurrentBlock] = useState(firstBlock);

  const isFirstBlock = currentBlock === firstBlock;
  const isLastBlock = currentBlock === lastBlock;

  const blockFirstPage = currentBlock * 4 + 2;
  const blockLastPage = (currentBlock + 1) * 4;

  const isBlockFirstPage = +currentPage === blockFirstPage;
  const isBlockLastPage = +currentPage === blockLastPage;

  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (currentPage === '1') {
      setCurrentBlock(firstBlock);
    }

    if (currentPage === pages.toString()) {
      setCurrentBlock(lastBlock);
    }
  }, [currentPage]);

  const onLeftMove = () => {
    if (currentPage !== '1') {
      setPage((+currentPage - 1).toString());
      if (+currentPage <= blockFirstPage) {
        setCurrentBlock(currentBlock - 1);
      }
    }
  };

  const onRightMove = () => {
    if (!(isBlockLastPage && isLastBlock)) {
      setPage((+currentPage + 1).toString());
      if (+currentPage >= blockLastPage) {
        setCurrentBlock(currentBlock + 1);
      }
    }
  };

  return (
    <div className="pagination">
      <button className="pagination__left-slide" onClick={onLeftMove}>
        <div
          className={
            isFirstBlock && isBlockFirstPage
              ? 'icon icon-left-disabled'
              : 'icon icon-left'
          }
        />
      </button>

      <div className="pagination__slider">
        <li className="pagination__slider-item" key={1}>
          <button
            className={classNames('pagination__slider-num', {
              'pagination__slider-num-active': currentPage === '1',
            })}
            onClick={() => setPage('1')}
          >
            {1}
          </button>
        </li>
        {currentBlock !== 0 && <p className="pagination__slider-dots">...</p>}
        <ul className="pagination__slider-list" ref={list}>
          {pagesArray
            .slice(blockFirstPage - 1, blockLastPage + 1)
            .map(pageNum => (
              <li className="pagination__slider-item" key={pageNum}>
                <button
                  className={classNames('pagination__slider-num', {
                    'pagination__slider-num-active': currentPage === pageNum,
                  })}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              </li>
            ))}
        </ul>
        {currentBlock !== lastBlock && (
          <>
            <p className="pagination__slider-dots">...</p>
            <li className="pagination__slider-item" key={pages}>
              <button
                className={classNames('pagination__slider-num', {
                  'pagination__slider-num-active':
                    currentPage === pages.toString(),
                })}
                onClick={() => setPage(pages.toString())}
              >
                {pages}
              </button>
            </li>
          </>
        )}
      </div>

      <button className="pagination__right-slide" onClick={onRightMove}>
        <div
          className={
            isLastBlock && isBlockLastPage
              ? 'icon icon-right-disabled'
              : 'icon icon-right'
          }
        />
      </button>
    </div>
  );
};
