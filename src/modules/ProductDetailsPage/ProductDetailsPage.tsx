import './ProductDetailsPage.scss';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getProductDetails } from '../../services/products';
import { ProductDetails } from '../../types/ProductDetails';
import { ImageGalery } from './components/ImageGalery';
import { MainControls } from './components/MainControls';
import { SuggestedProducts } from './components/SuggestedProducts';
import { Descriptions } from './components/Descriptions';
import { BackBtn } from '../shared/BackBtn';
import { TechSpecs } from './components/TechSpecs';
import { scrollToTop } from '../../helpers/scrollToTop';
import { BreadCrumb } from '../shared/BreadCrumb/BreadCrumb';
import { Loader } from '../shared/Loader';
import { ErrorSmthWrong, ErrorWithProduct } from '../shared/ErrorMessage';

export const ProductDetailsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { pathname } = useLocation();
  const { productId = '' } = useParams();

  const [product, setProduct] = useState<ProductDetails | null>(null);

  useEffect(() => {
    setError(false);
    scrollToTop();
    setLoading(true);

    getProductDetails(pathname.split('/')[1], productId)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 200),
      );
  }, [pathname, productId]);

  const noProduct = !product;

  const showDetails = !error && !loading && product;

  return (
    <div className="product-details ">
      <div className="product-details__top container">
        <BreadCrumb />
      </div>

      <div className="product-details__back container">
        <BackBtn />
      </div>

      {loading && <Loader />}
      {!loading && error && <ErrorSmthWrong />}
      {!loading && !error && noProduct && <ErrorWithProduct />}

      {showDetails && (
        <>
          <p className="h2 product-details__title container">{product?.name}</p>

          <div className="product-details__content container">
            <div className="product-details__galery">
              <ImageGalery product={product} />
            </div>
            <div className="product-details__main-info">
              <MainControls product={product} />
            </div>

            <div className="product-details__about">
              <Descriptions product={product} />
            </div>

            <div className="product-details__techSpecs">
              <TechSpecs product={product} />
            </div>
          </div>

          <div className="product-details__suggestedProducts">
            <SuggestedProducts />
          </div>
        </>
      )}
    </div>
  );
};
