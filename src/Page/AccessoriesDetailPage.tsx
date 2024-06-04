import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Breadcrumbs } from '../components/Bredcrambs';
import { PhoneDetail } from '../components/PhoneDetail';
import { Loader } from '../components/Loader';
import { ArrowLeft } from '../icons';

import '../components/PhoneDetail/PhoneDetail.scss';
import { Error } from './Error';
import {
  fetchAccessoriesDetail,
  selectAccessoriesDetail,
  selectAccessoriesDetailStatus,
} from '../features/accessoriesSlices';
import { selectAccessories } from '../features/productsSlice';

export const AccessoriesDetailPage = () => {
  const { itemId } = useParams();
  const phoneDetailStatus = useAppSelector(selectAccessoriesDetailStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessories = useAppSelector(selectAccessories);
  const accessorie = useAppSelector(selectAccessoriesDetail);

  const goBack = () => {
    navigate({ pathname: '..', search: location.state?.search });
  };

  useEffect(() => {
    dispatch(fetchAccessoriesDetail(itemId || ''));
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
            className="phoneDetail__button"
            onClick={goBack}
          >
            <ArrowLeft />
            <span>Back</span>
          </button>

          <PhoneDetail
            items={accessories}
            item={accessorie}
          />
        </>
      )}
      {phoneDetailStatus === 'error' && (
        <Error message="Sorry but phone is not found" />
      )}
    </>
  );
};
