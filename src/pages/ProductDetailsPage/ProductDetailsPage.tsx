import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductDetailsCard } from '../../components/ProductDetailsCard';
import './ProductDetailsPage.scss';
import React, { useEffect, useState } from 'react';
import { getNewProducts } from '../../services/getNewProducts';
import { Slider } from '../../components/Slider';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import { useAppDispath, useAppSelector } from '../../hooks/hooks';
import { NotFoundProductPage } from '../NotFoundProductPage';
import { setProds } from '../../features/prods';
import { Loader } from '../../components/Loader';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductsDetails } from '../../services/getProductsDetails';
import { useTranslation } from 'react-i18next';

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsDetails, setProductsDetails] = useState<ProductDetails[]>([]);
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { prods } = useAppSelector(state => state.prods);
  const dispatch = useAppDispath();
  const slash = true;
  const { productId = '' } = useParams();
  const { pathname } = useLocation();
  const id = productId.slice(1);
  const currProd: ProductDetails | undefined = productsDetails.find(
    item => item.id === id,
  );

  const path = pathname.slice(1);
  const category = path.split('/').slice(0, 1).join();

  useEffect(() => {
    setIsLoading(true);

    getNewProducts()
      .then(resolve => {
        dispatch(setProds(resolve));
      })
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch]);

  useEffect(() => {
    getProductsDetails(category).then(setProductsDetails);
  }, [category, id]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  const filteredProducts = prods
    .filter(product => product.itemId !== id)
    .filter(item => item.category === category);

  if (!isLoading && !currProd) {
    return (
      <NotFoundProductPage
        title={t('productDetailsPage.notFoundProduct.title')}
      />
    );
  }

  return (
    <div className="productDetailsPage">
      <div className="container">
        <BreadCrumbs />
        <button
          className="productDetailsPage__back"
          onClick={() => navigate(-1)}
        >
          <img
            src={theme === 'light-theme' ? arrow : arrowDark}
            alt="Arrow"
            className="productDetailsPage__back--img"
          />
          <p className="productDetailsPage__back--text">
            {t('productDetailsPage.back')}
          </p>
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductDetailsCard products={prods} currProd={currProd} />
          {currProd && (
            <Slider
              products={filteredProducts}
              slash={slash}
              title={t('productDetailsPage.slider.title')}
            />
          )}
        </>
      )}
    </div>
  );
};
