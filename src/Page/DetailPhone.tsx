import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PhoneDetail } from '../components/Phones/PhoneDetail';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPhoneDetail,
  selectPhone,
  selectStatus,
} from '../features/phoneDetail/phoneDetailSlice';

export const DetailPhonePage = () => {
  const { phoneId } = useParams();
  const phone = useAppSelector(selectPhone);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log('phoneid', phoneId);
    // console.log(status);
    // console.log(phone);
    if (status === 'idle') {
      dispatch(fetchPhoneDetail(phoneId || ''));
    }
  }, [dispatch, phoneId, status]);

  return (
    <>
      <PhoneDetail phone={phone} />
    </>
  );
};
