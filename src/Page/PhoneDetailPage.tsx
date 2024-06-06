import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPhoneDetail, selectPhoneDetail, selectPhoneDetailStatus,
} from '../features/phoneDetailSlices';
import { Breadcrumbs } from '../components/Bredcrambs';
import { ProductDetail } from '../components/ProductDetail';
import { Loader } from '../components/Loader';
import { ArrowLeft } from '../icons';

import '../components/ProductDetail/ProductDetail.scss';
import { Error } from './Error';
import { selectPhones } from '../features/productsSlice';

export const PhoneDetailPage = () => {
  const { itemId } = useParams();
  const phoneDetailStatus = useAppSelector(selectPhoneDetailStatus);
  const phones = useAppSelector(selectPhones);
  const phone = useAppSelector(selectPhoneDetail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    navigate({ pathname: '..', search: location.state?.search });
  };

  useEffect(() => {
    dispatch(fetchPhoneDetail(itemId || ''));
  }, [dispatch, itemId]);

  return (
    <>
      {phoneDetailStatus === 'loading' && (<Loader />)}
      {phoneDetailStatus === 'succeeded' && (
        <>
          <Breadcrumbs />
          <button
            data-cy="backButton"
            type="button"
            className="productDetail__button"
            onClick={goBack}
          >
            <ArrowLeft />
            <span>Back</span>
          </button>

          <ProductDetail
            item={phone}
            items={phones}
          />
        </>
      )}
      {phoneDetailStatus === 'error' && (
        <Error message="Sorry but phone is not found" />
      )}
    </>
  );
};
