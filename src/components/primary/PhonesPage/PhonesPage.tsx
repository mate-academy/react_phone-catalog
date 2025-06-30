/* eslint-disable max-len */
import { PhonesBottom } from '../../secondary/PhonesComponents/PhonesBottom.tsx';
import { PhonesList } from '../../secondary/PhonesComponents/PhonesList/index.js';
import { PhonesTop } from '../../secondary/PhonesComponents/PhonesTop/index.js';
import { ErrorBlock } from '../../../messageError/MessageError.js';
import { usePagedList } from '../../../utils/usePagedList';
import { getPhonesData } from '../../../api/ProductApi.js';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spiner } from '../../../spiner/spiner.js';
import { Product } from '../../../types/Product';
import './PhonesPage.scss';

export const PhonesPage = () => {
  const [initialList, setInitialList] = useState<Product[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = +(searchParams.get('filter02') || 16);
  const { filterListPhone } = usePagedList(initialList, itemsPerPage);

  const sortSelect = searchParams.get('filter01') || 'Newest';
  const actualButton = Number(searchParams.get('actual-list') || 1);
  const [hasError, SetHasError] = useState<boolean>(false);

  const phonesList = useMemo(() => {
    return filterListPhone(actualButton, initialList, itemsPerPage, sortSelect);
  }, [itemsPerPage, actualButton, sortSelect, initialList, filterListPhone]);

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
    getPhonesData('phones.json')
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
        <section className="phones">
          <div className="phones-content">
            <PhonesTop
              phonesList={phonesList}
              itemsPerPage={itemsPerPage}
              sortSelect={sortSelect}
            />

            <PhonesList phonesList={phonesList} />

            <PhonesBottom
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
