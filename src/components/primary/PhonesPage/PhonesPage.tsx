import { PhonesBottom } from '../../secondary/PhonesComponents/PhonesBottom.tsx';
import { PhonesList } from '../../secondary/PhonesComponents/PhonesList/index.js';
import { PhonesTop } from '../../secondary/PhonesComponents/PhonesTop/index.js';
import { useEffect, useMemo, useState } from 'react';
import { usePagedList } from '../../../utils/usePagedList';
import { getPhonesData } from '../../../api/PhonesApi';
import { Product } from '../../../types/Product';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';

export const PhonesPage = () => {
  const [initialList, setInitialList] = useState<Product[] | []>([]);
  const { filterListPhone } = usePagedList(initialList);

  const [searchParams] = useSearchParams();
  const sortSelect = searchParams.get('filter01') || 'Newest';
  const itemsPerPage = +(searchParams.get('filter02') || 16);
  const actualButton = Number(searchParams.get('actual-list') || 1);

  const phonesList = useMemo(() => {
    return filterListPhone(actualButton, initialList, itemsPerPage, sortSelect);
  }, [itemsPerPage, actualButton, sortSelect]);

  useEffect(() => {
    getPhonesData().then(res => {
      setInitialList(res);
    });

    window.alert(actualButton);
  }, []);

  return (
    <section className="phones">
      <PhonesTop
        phonesList={phonesList}
        itemsPerPage={itemsPerPage}
        sortSelect={sortSelect}
      />

      <PhonesList phonesList={phonesList} />

      <PhonesBottom initialList={initialList} actualButton={actualButton} />
    </section>
  );
};
