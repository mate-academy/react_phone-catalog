import { useState } from 'react';
import { PerPage } from '../types/PerPage';
import { getPerPageFromParams } from '../utils/getPerPageFromParams';
import { getPageFromParams } from '../utils/getPageFromParams';
import { SortOption } from '../types/SortOption';
import { getSortFromParams } from '../utils/getSortFormParams';
import { getSearchWith } from '../utils/getSearchWith';
import { Params } from '../types/Params';
import { SetURLSearchParams } from 'react-router-dom';

// типізуємо аргументи
type UseCatalogControlsArgs = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  productsQuantity: number;
};

export const useCatalogControls = ({
  searchParams,
  setSearchParams,
  productsQuantity,
}: UseCatalogControlsArgs) => {
  //#region Variables
  // тут замість значення прописуємо функцію, щоб ініціалізація йшла з URL
  const [currentPage, setCurrentPage] = useState<number>(() =>
    getPageFromParams(searchParams),
  );
  const [perPage, setPerPage] = useState<PerPage>(() =>
    getPerPageFromParams(searchParams),
  );
  const sortOption: SortOption = getSortFromParams(searchParams);
  const pageQuantity =
    perPage === 'all' ? 1 : Math.max(1, Math.ceil(productsQuantity / perPage));
  const pages = Array.from({ length: pageQuantity }, (_, i) => i + 1);

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= pageQuantity;
  //#endregion

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  //#region Handlers
  const handleLeftButtonClick = () => {
    if (!prevDisabled) {
      const newPage = currentPage - 1;

      setCurrentPage(newPage);

      setSearchWith({ page: newPage });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleRightButtonClick = () => {
    if (!nextDisabled) {
      const newPage = currentPage + 1;

      setCurrentPage(newPage);

      setSearchWith({ page: newPage });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchWith({ page });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSortOptionChange = (value: SortOption) => {
    setCurrentPage(1); // оновлюємо сторінку при зміні sort

    setSearchWith({
      sort: value, // оновлюємо sort
      page: 1, // і скидаємо page в 1
    });
  };

  const handlePerPageChange = (value: string | number) => {
    const newPerPage =
      typeof value === 'number' || value === 'all' ? value : Number(value);

    setCurrentPage(1);
    setPerPage(newPerPage);

    setSearchWith({
      perPage: newPerPage,
      page: 1,
    });
  };
  //#endregion

  return {
    currentPage,
    perPage,
    sortOption,
    pages,
    prevDisabled,
    nextDisabled,
    handleLeftButtonClick,
    handleRightButtonClick,
    handlePageChange,
    handleSortOptionChange,
    handlePerPageChange,
  };
};
