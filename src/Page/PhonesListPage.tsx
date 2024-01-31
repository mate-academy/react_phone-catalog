import { useEffect } from 'react';
import { PhonesList } from '../components/PhoneList/PhonesList';
import { useAppSelector } from '../app/hooks';
import {
  selectPhones, selectPhonesStatus,
} from '../features/phoneSlice/phonesSlice';
import { Loader } from '../components/Loader';

export const PhonesListPage = () => {
  const phones = useAppSelector(selectPhones) || [];
  const phonesStatus = useAppSelector(selectPhonesStatus);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <>
      {phonesStatus === 'loading' && <Loader />}
      {phonesStatus === 'succeeded' && <PhonesList phones={phones} />}
      {phonesStatus === 'error' && 'Error 404'}
    </>
  );
};
