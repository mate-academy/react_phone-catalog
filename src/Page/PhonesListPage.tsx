import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PhonesList } from '../components/PhoneList';
import { useAppSelector } from '../app/hooks';
import { getCheckQuery } from '../helper';
import {
  selectPhones,
  selectPhonesStatus,
} from '../features/phoneSlice';

import { Loader } from '../components/Loader';
import { Error } from './Error';
import { Breadcrumbs } from '../components/Bredcrambs';

import '../components/PhoneList/PhonesList.scss';

export const PhonesListPage = () => {
  const phones = useAppSelector(selectPhones) || [];
  const phonesStatus = useAppSelector(selectPhonesStatus);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => getCheckQuery(phone.name, query));
  }, [query, phones]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="phoneList">
      <Breadcrumbs />
      <h1 className="phoneList__title">Modile Phones</h1>
      <p className="phoneList__length">
        {`${filteredPhones.length} ${query.length > 0 ? 'result' : 'models'}`}
      </p>

      {phonesStatus === 'loading' && <Loader />}
      {phonesStatus === 'succeeded' && <PhonesList phones={filteredPhones} />}
      {phonesStatus === 'error'
        && <Error message="Sorry but phones not found" />}
    </div>
  );
};
