// eslint-disable-next-line max-len

import { AccessoriesBottom } from '../../secondary/AccessoriesComponents/AccessoriesBottom/AccessoriesBottom.js';
import { AccessoriesList } from '../../secondary/AccessoriesComponents/AccessoriesList/AccessoriesList.js';
import { AccessoriesTop } from '../../secondary/AccessoriesComponents/AccessoriesTop/AccessoriesTop.js';
import { ErrorBlock } from '../../../messageError/MessageError.js';
import { usePagedList } from '../../../utils/usePagedList.js';
import { getPhonesData } from '../../../api/ProductApi.js';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../../types/Product.js';
import { useSearchParams } from 'react-router-dom';
import { Spiner } from '../../../spiner/spiner.js';
import './Accessories.scss';

export const AccessoriesPage = () => {
  const [initialList, setInitialList] = useState<Product[] | []>([]);
  const [searchParams] = useSearchParams();
  const actualButton = Number(searchParams.get('actual-list') || 1);
  const sortSelect = searchParams.get('filter01') || 'Newest';
  const itemsPerPage = +(searchParams.get('filter02') || 16);
  const { filterListPhone } = usePagedList(initialList, itemsPerPage);
  const [hasError, SetHasError] = useState<boolean>(false);

  useEffect(() => {
    getPhonesData('accessories.json')
      .then(response => {
        setInitialList(response);
      })
      .catch(() => {
        SetHasError(true);
      });
  }, []);

  const accessoriesList = useMemo(() => {
    return filterListPhone(actualButton, initialList, itemsPerPage, sortSelect);
  }, [filterListPhone, itemsPerPage, actualButton, sortSelect, initialList]);

  if (initialList.length === 0) {
    return <Spiner />;
  }

  return (
    <>
      {hasError ? (
        <ErrorBlock />
      ) : (
        <section className="accessories">
          <AccessoriesTop
            accessoriesList={accessoriesList}
            itemsPerPage={itemsPerPage}
            sortSelect={sortSelect}
          />

          <AccessoriesList accessoriesList={accessoriesList} />

          <AccessoriesBottom
            itemsPerPage={itemsPerPage}
            initialList={initialList}
            actualButton={actualButton}
          />
        </section>
      )}
    </>
  );
};
