import { TabletsBottom } from '../../secondary/TabletsComponents/TabletsBottom/TabletsBottom.js';
import { TabletsList } from '../../secondary/TabletsComponents/TabletsList/TabletsList.js';
import { TabletsTop } from '../../secondary/TabletsComponents/TabletsTop/TabletsTop.js';
import { ErrorBlock } from '../../../messageError/MessageError.js';
import { usePagedList } from '../../../utils/usePagedList.js';
import { getPhonesData } from '../../../api/ProductApi.js';
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../../types/Product.js';
import { useSearchParams } from 'react-router-dom';
import { Spiner } from '../../../spiner/spiner.js';
import './Tablets.scss';

export const Tablets = () => {
  const [initialList, setInitialList] = useState<Product[] | []>([]);

  const [searchParams] = useSearchParams();
  const actualButton = Number(searchParams.get('actual-list') || 1);
  const sortSelect = searchParams.get('filter01') || 'Newest';
  const itemsPerPage = +(searchParams.get('filter02') || 16);
  const { filterListPhone } = usePagedList(initialList, itemsPerPage);
  const [hasError, SetHasError] = useState<boolean>(false);

  const tabletsList = useMemo(() => {
    return filterListPhone(actualButton, initialList, itemsPerPage, sortSelect);
  }, [itemsPerPage, actualButton, sortSelect, initialList, filterListPhone]);

  useEffect(() => {
    getPhonesData('tablets.json')
      .then(response => {
        setInitialList(response);
      })
      .catch(() => {
        SetHasError(true);
      });
  }, []);

  if (initialList.length === 0) {
    return <Spiner />;
  }

  return (
    <>
      {hasError ? (
        <ErrorBlock />
      ) : (
        <section className="tablets">
          <TabletsTop
            tabletsList={tabletsList}
            itemsPerPage={itemsPerPage}
            sortSelect={sortSelect}
          />

          <TabletsList tabletsList={tabletsList} />

          <TabletsBottom
            itemsPerPage={itemsPerPage}
            initialList={initialList}
            actualButton={actualButton}
          />
        </section>
      )}
    </>
  );
};
