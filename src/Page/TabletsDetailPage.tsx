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
  fetchTabletsDetail,
  selectTabletDetail,
  selectTabletDetailStatus,
} from '../features/tabletDetailSlices';
import { selectTalets } from '../features/productsSlice';

export const TabletDetailPage = () => {
  const { itemId } = useParams();
  const tabletDetailStatus = useAppSelector(selectTabletDetailStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tablets = useAppSelector(selectTalets);
  const tablet = useAppSelector(selectTabletDetail);
  const location = useLocation();

  const goBack = () => {
    navigate({ pathname: '..', search: location.state?.search });
  };

  useEffect(() => {
    dispatch(fetchTabletsDetail(itemId || ''));
  }, [dispatch, itemId]);

  return (
    <>
      {tabletDetailStatus === 'loading' && (<Loader />)}
      {tabletDetailStatus === 'succeeded' && (
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
            item={tablet}
            items={tablets}
          />
        </>
      )}
      {tabletDetailStatus === 'error' && (
        <Error message="Sorry but tablet is not found" />
      )}
    </>
  );
};
