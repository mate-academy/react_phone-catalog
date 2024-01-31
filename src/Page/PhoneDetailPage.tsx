import {
  useNavigate,
  useParams,
  // useLocation,
  useNavigationType,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPhoneDetail, selectPhoneDetailStatus,
} from '../features/phoneDetail/phoneDetailSlice';
import { Breadcrumbs } from '../components/Bredcrambs/Breadcrumbs';
import { PhoneDetail } from '../components/PhoneDetail';
import { Loader } from '../components/Loader';
import { ArrowLeft } from '../icons/ArrowLeft';
import '../components/PhoneDetail/PhoneDetail.scss';

export const PhoneDetailPage = () => {
  const { phoneId } = useParams();
  const phoneDetailStatus = useAppSelector(selectPhoneDetailStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { state } = useLocation();
  const navigationType = useNavigationType();

  console.log(phoneDetailStatus);
  console.log(navigationType);
  const goBack = () => {
    navigate('..');
  };

  useEffect(() => {
    dispatch(fetchPhoneDetail(phoneId || ''));
  }, [dispatch, phoneId]);

  return (
    <>
      {phoneDetailStatus === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
            <button
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
    </>
  );
};
