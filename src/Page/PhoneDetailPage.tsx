import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPhoneDetail, selectPhoneDetailStatus,
} from '../features/phoneDetail';
import { Breadcrumbs } from '../components/Bredcrambs';
import { PhoneDetail } from '../components/PhoneDetail';
import { Loader } from '../components/Loader';
import { ArrowLeft } from '../icons';

import '../components/PhoneDetail/PhoneDetail.scss';
import { Error } from './Error';

export const PhoneDetailPage = () => {
  const { phoneId } = useParams();
  const phoneDetailStatus = useAppSelector(selectPhoneDetailStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const goBack = () => {
    navigate({ pathname: '..', search: state?.search });
  };

  useEffect(() => {
    dispatch(fetchPhoneDetail(phoneId || ''));
  }, [dispatch, phoneId]);

  return (
    <>
      {phoneDetailStatus === 'loading' && (<Loader />)}
      {phoneDetailStatus === 'succeeded' && (
        <>
          <Breadcrumbs />
          <button
            data-cy="backButton"
            type="button"
            className="phoneDetail__button"
            onClick={goBack}
          >
            <ArrowLeft />
            <span>Back</span>
          </button>

          <PhoneDetail phoneId={phoneId} />
        </>
      )}
      {phoneDetailStatus === 'error' && (
        <Error message="Sorry but phone is not found" />
      )}
    </>
  );
};
