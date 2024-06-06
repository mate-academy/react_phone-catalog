import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Breadcrumbs } from '../components/Bredcrambs';
import { ProductDetail } from '../components/ProductDetail';
import { Loader } from '../components/Loader';
import { ArrowLeft } from '../icons';

import '../components/ProductDetail/ProductDetail.scss';
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
            className="productDetail__button"
            onClick={goBack}
          >
            <ArrowLeft />
            <span>Back</span>
          </button>

          <ProductDetail
            items={accessories}
            item={accessorie}
          />
        </>
      )}
      {phoneDetailStatus === 'error' && (
        <Error message="Sorry but accessories is not found" />
      )}
    </>
  );
};
