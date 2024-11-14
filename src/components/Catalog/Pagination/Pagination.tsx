import classNames from 'classnames';
import { Product } from '../../../types/Product';
import style from './Pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../../types/SearchParams';
import { useEffect, useMemo, useState } from 'react';
import { catalogHelper } from '../../../utils/catalogHelper';

const generatePages = (pages: Product[][]) => {
  const pgObj = Array.from({ length: pages.length }, (_, i) => i + 1);

  return pgObj;
};

type Props = {
  pages: Product[][];
};
export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const allPages = useMemo(() => generatePages(pages), [pages]);

  useEffect(() => {
    setPrevPage(currentPage);
    setCurrentPage(catalogHelper.getCurrenPageParam(searchParams));
  }, [searchParams, currentPage]);

  useEffect(() => {
    const newVisPgs = allPages;

    if (currentPage < 4) {
      setVisiblePages(() => newVisPgs.slice(0, 4));

      return;
    }

    if (currentPage > newVisPgs.length - 3) {
      setVisiblePages(() => newVisPgs.slice(newVisPgs.length - 4));

      return;
    }

    if (currentPage > prevPage) {
      setVisiblePages(newVisPgs.slice(currentPage - 3, currentPage + 1));
    } else {
      setVisiblePages(newVisPgs.slice(currentPage - 2, currentPage + 2));
    }
  }, [currentPage, prevPage, allPages]);

  const handlePageSet = (pageNum: number) => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(searchParams);

    params.set(SearchParams.page, pageNum.toString());
    setSearchParams(() => params);
  };

  const handleNext = (direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams);
    let newPageNum = currentPage;

    switch (direction) {
      case 'prev':
        if (currentPage > 1) {
          newPageNum--;
        }

        break;

      case 'next':
        if (currentPage < pages.length) {
          newPageNum++;
        }

        break;
    }

    params.set(SearchParams.page, newPageNum.toString());
    setSearchParams(() => params);
  };

  return (
    <div className={style.pagination_container}>
      <div
        className={classNames(style.icon_container)}
        onClick={() => handleNext('prev')}
      >
        <div
          className={classNames(style.icon, style.icon_Left, {
            [style.icon_Left_disabled]: currentPage === 1,
          })}
        />
      </div>

      <div className={style.pages_container}>
        {currentPage > 3 && (
          <div className={style.to_end}>
            <div
              className={classNames(style.icon_container)}
              onClick={() => handlePageSet(1)}
            >
              <div>
                <p className={classNames(style.page_txt)}>1</p>
              </div>
            </div>
            <p>...</p>
          </div>
        )}

        {visiblePages.map(pg => {
          const selected = pg === currentPage;

          return (
            <div
              key={pg}
              className={classNames(style.icon_container, {
                [style.selected_container]: selected,
              })}
              onClick={() => handlePageSet(pg)}
            >
              <div>
                <p
                  className={classNames(style.page_txt, {
                    [style.selected_text]: selected,
                  })}
                >
                  {pg}
                </p>
              </div>
            </div>
          );
        })}

        {currentPage < allPages.length - 2 && (
          <div className={style.to_end}>
            <p>...</p>

            <div
              className={classNames(style.icon_container)}
              onClick={() => handlePageSet(allPages[allPages.length - 1])}
            >
              <div>
                <p className={classNames(style.page_txt)}>
                  {allPages[allPages.length - 1]}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={classNames(style.icon_container)}
        onClick={() => handleNext('next')}
      >
        <div
          className={classNames(style.icon, style.icon_Right, {
            [style.icon_Right_disabled]: pages.length === currentPage,
          })}
        />
      </div>
    </div>
  );
};
