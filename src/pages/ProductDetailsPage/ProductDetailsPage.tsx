/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useGetProductDetailsQuery } from '../../features/product/productSlice';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import BackButton from '../../components/BackButton/BackButton';
import Loader from '../../components/Loader/Loader';
import SingleProductPage
  from
  '../../components/SingleProductPage/SingleProductPage';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import { init } from '../../features/products/productsSlice';
import { Product } from '../../Types/Product';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.products);
  const selectedProduct = useMemo(() => {
    return list.find(item => item.id === productId);
  }, [list, productId]) as Product;

  const {
    data: productDetails,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetProductDetailsQuery(productId);

  useEffect(() => {
  }, [isFetching, isLoading, isSuccess, productId]);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      )
        : (!isSuccess ? (
          <NotFoundPage title="Page not found..." />
        )
          : (
            <>
              <BreadCrumbs />
              <BackButton />
              <SingleProductPage
                productDetails={productDetails}
                product={selectedProduct}
              />
              <ProductSlider title="You may also like" products={list} />
            </>
          )
        )}
    </div>
  );
};

export default ProductDetailsPage;
