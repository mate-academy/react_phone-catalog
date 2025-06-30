/* eslint-disable max-len */

import { PagesBottom } from '../../secondary/PagesComponents/PagesBottom/PagesBottom.js';
import { PagesList } from '../../secondary/PagesComponents/PagesList/PagesList.js';
import { PagesTop } from '../../secondary/PagesComponents/PagesTop/PagesTop.js';
import { ErrorBlock } from '../../secondary/messageError/MessageError.js';
import { useLocation, useSearchParams } from 'react-router-dom';
import { usePagedList } from '../../../utils/usePagedList.js';
import { getPhonesData } from '../../../api/ProductApi.js';
import { Spiner } from '../../secondary/spiner/spiner.js';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../../types/Product.js';
import './Pages.scss';

export const Pages = () => {
  const [initialList, setInitialList] = useState<Product[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const actualButton = Number(searchParams.get('actual-list') || 1);
  const sortSelect = searchParams.get('filter01') || 'Newest';
  const itemsPerPage = +(searchParams.get('filter02') || 16);
  const { filterListPhone } = usePagedList(initialList, itemsPerPage);
  const [hasError, SetHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const totalPages = Math.ceil(initialList.length / itemsPerPage);

    if (actualButton > totalPages) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('actual-list', '1');
      setSearchParams(newParams);
    }
  }, [
    itemsPerPage,
    initialList.length,
    actualButton,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    setIsLoading(true);

    let doFetch = '';

    switch (location.pathname) {
      case '/phones':
        doFetch = 'phones.json';
        break;
      case '/accessories':
        doFetch = 'accessories.json';
        break;
      case '/tablets':
        doFetch = 'tablets.json';
        break;
    }

    getPhonesData(doFetch)
      .then(response => {
        setInitialList(response);
        setIsLoading(false);
      })
      .catch(() => {
        SetHasError(true);
        setIsLoading(false);
      });
  }, [location.pathname]);

  const renderList = useMemo(() => {
    return filterListPhone(actualButton, initialList, itemsPerPage, sortSelect);
  }, [filterListPhone, itemsPerPage, actualButton, sortSelect, initialList]);

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <>
      {hasError ? (
        <ErrorBlock />
      ) : (
        <section className="pages">
          <div className="pages-content">
            <PagesTop
              renderList={renderList}
              itemsPerPage={itemsPerPage}
              sortSelect={sortSelect}
            />

            <PagesList renderList={renderList} />

            <PagesBottom
              itemsPerPage={itemsPerPage}
              initialList={initialList}
              actualButton={actualButton}
            />
          </div>
        </section>
      )}
    </>
  );
};
