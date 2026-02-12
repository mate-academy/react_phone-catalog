import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PagePagination.scss';
import { icons } from '../../../../../global-assets/static';
import { CircleButton } from '../../../../shared/components/Buttons/CircleButton';
import { useSearchParams } from 'react-router-dom';
import { ProductsState } from '../../../../shared/reducer/ProductPageReducer';
import { getSequence } from '../../../../shared/servises/createVar';

export const PagePagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page') || '1';
  const productList = useContext(ProductsState);
  const maxPages = 5;
  const [visiblePages, setVisiblePages] = useState<string[]>();

  const getPages = useCallback((): string[] => {
    switch (perPage) {
      case '4':
      case '8':
      case '16':
        return getSequence(productList.currentProducts.length / +perPage);
      default:
        return ['1'];
    }
  }, [perPage, productList.currentProducts.length]);

  const pageList: string[] = getPages();

  useEffect(() => {
    const listOfPages = getPages();
    const visibleList =
      listOfPages.length > maxPages ? pageList.slice(0, maxPages) : listOfPages;

    setVisiblePages(visibleList);
  }, [getPages]);

  const handleNext = () => {
    if (!visiblePages?.length) {
      return;
    }

    const currentStartIndex = pageList.indexOf(visiblePages[0]);
    const currentEndIndex = pageList.indexOf(
      visiblePages[visiblePages.length - 1],
    );

    if (page === pageList[pageList.length - 1]) {
      return;
    }

    if (
      (pageList.indexOf(page) > currentStartIndex &&
        pageList.indexOf(page) < currentEndIndex) ||
      pageList.indexOf(page) === currentStartIndex
    ) {
      const nextPage = (+page + 1).toString();

      const params = new URLSearchParams(searchParams);

      params.set('page', nextPage);
      setSearchParams(params);

      return;
    }

    const nextStartIndex = currentStartIndex + 1;

    const nextEndIndex = nextStartIndex + maxPages;

    const nextPages = pageList.slice(nextStartIndex, nextEndIndex);
    const nextPage = nextPages[nextPages.length - 1];

    setVisiblePages(nextPages);

    const params = new URLSearchParams(searchParams);

    params.set('page', nextPage);
    setSearchParams(params);
  };

  const handlePrev = () => {
    if (!visiblePages?.length) {
      return;
    }

    const currentStartIndex = pageList.indexOf(visiblePages[0]);

    if (page === '1') {
      return;
    }

    const currentPageIndex = pageList.indexOf(page);

    if (currentPageIndex > currentStartIndex) {
      const prevPage = (+page - 1).toString();

      const params = new URLSearchParams(searchParams);

      params.set('page', prevPage);
      setSearchParams(params);

      return;
    }

    const nextStartIndex = currentStartIndex - 1;

    const nextEndIndex = nextStartIndex + maxPages;

    const nextPages = pageList.slice(nextStartIndex, nextEndIndex);
    const prevPage = nextPages[0];

    setVisiblePages(nextPages);

    const params = new URLSearchParams(searchParams);

    params.set('page', prevPage);
    setSearchParams(params);
  };

  const handlePagination = (pageTitle: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageTitle);
    setSearchParams(params);
  };

  if (!visiblePages) {
    return;
  }

  return (
    <div className="page-pagination">
      <button
        className="page-pagination page-pagination--arrow arrow"
        disabled={page === '1'}
        onClick={handlePrev}
      >
        <CircleButton
          icon={icons.arrowLeft.valuePath}
          isDisabled={page === '1'}
        />
      </button>

      <div className="page-pagination page-pagination__list">
        {visiblePages.map(pageItem => (
          <button
            className="page-pagination page-pagination__page"
            key={pageItem}
            onClick={() => handlePagination(pageItem ?? '1')}
          >
            <CircleButton icon={`${pageItem}`} isActive={page === pageItem} />
          </button>
        ))}
      </div>

      <button
        className="page-pagination page-pagination--arrow"
        onClick={handleNext}
        disabled={page === pageList[pageList.length - 1]}
      >
        <CircleButton
          icon={icons.arrowRight.valuePath}
          isDisabled={page === pageList[pageList.length - 1]}
        />
      </button>
    </div>
  );
};
