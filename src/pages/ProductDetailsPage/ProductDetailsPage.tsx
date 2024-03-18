import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductSlider } from '../../components/ProductSlider';
import { NotFoundPage } from '../NotFoundPage';
import { getRandomProducts } from '../../api/api';
import { Loader } from '../../components/Loader';
import { thunkGetProduct } from '../../features/productInfo/productInfoSlice';
import {
  removeProduct,
  thunkGetPhones,
} from '../../features/product/productsSlice';

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(state => state.product);
  const { phones } = useAppSelector(state => state.phones);

  const goBack = () => {
    navigate(-1);
  };

  const loadProduct = useCallback(() => {
    if (itemId) {
      dispatch(thunkGetProduct(itemId));
      dispatch(thunkGetPhones());
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    loadProduct();

    return () => {
      dispatch(removeProduct());
    };
  }, [dispatch, loadProduct]);

  const youMayAlsoLike = useMemo(() => {
    return getRandomProducts(phones);
  }, [phones]);

  if (loading && !error) {
    return (
      <div className="product-details__loader">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return <NotFoundPage />;
  }

  if (error) {
    return <SomethingWentWrong />;
  }

  const productSelected = phones.find(phone => phone.itemId === product.id);

  if (!productSelected) {
    return <NotFoundPage />;
  }

  return (
    <div className="product-details-page">
      <div className="product-details">
        {!loading && !error && product && (
          <>
            <div className="product-details__nav">
              <button
                className="product-details__back"
                onClick={goBack}
                aria-label="go-back"
                type="button"
                data-cy="backButton"
              >
                <div className="icon icon-prev" />

                <p className="cart-page__text">Back</p>
              </button>
            </div>

            <ProductInfo product={product} productSelected={productSelected} />
          </>
        )}
      </div>

      <section className="you-may-also-like">
        <ProductSlider title="You may also like" products={youMayAlsoLike} />
      </section>
    </div>
  );
};
