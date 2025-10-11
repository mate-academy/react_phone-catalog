import { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/breadcrumbs';
import { Catalog } from '../components/Catalog/catalog';
import { Pagination } from '../components/Pagination/pagination';
import { PhonesTitle } from '../components/PhonesTitle/phones-title';
import { Sort } from '../components/Sort/sort';
import phones from '../../public/api/phones.json';
import { Phone } from '../Types/type';

export const PhonesPage = () => {
  const [phonesOnPage, setPhonesOnPage] = useState<Phone[]>(
    phones.slice(0, 16),
  );

  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Sort />
      <Catalog phonesOnPage={phonesOnPage} />
      <Pagination
        phonesOnPage={phonesOnPage}
        setPhonesOnPage={setPhonesOnPage}
      />
    </>
  );
};
