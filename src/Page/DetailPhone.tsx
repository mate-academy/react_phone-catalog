import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PhoneDetail } from '../components/Phones/PhoneDetail';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPhoneDetail,
  // selectPhone,
} from '../features/phoneDetail/phoneDetailSlice';
import { selectStatus } from '../features/favouritesSlices/favouritesSlice';

export const DetailPhonePage = () => {
  const { phoneId } = useParams();
  // const phone = useAppSelector(selectPhone);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhoneDetail(phoneId || ''));
    }
  }, [dispatch, selectStatus]);

  return (
    <>
      <PhoneDetail />
    </>
  );
};
