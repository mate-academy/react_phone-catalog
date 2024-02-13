/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/self-closing-comp */
import {
  useContext, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { PathBlock } from '../../components/PathBlock';
import { ProductsSlider } from '../../components/ProductsSlider';
import { MainContext } from '../../context';
import { ProductDetails as Details } from '../../types/ProductDetails';
import { getProductDetails } from '../../helpers/getProducts';
import { scrollToTop } from '../../helpers/scrollToTop';
import './product-details-page.scss';
import { ProductDetails } from '../../components/ProductDetails';
import { NotFoundPage } from '../NotFoundPage';

export const ProductDetailsPage = () => {
  const {
    setCurrentPage,
    products,
  } = useContext(MainContext);

  const [
    productDetails, setProductDetails,
  ] = useState<Details | null>(null);

  const { productId } = useParams();

  const getProductDetailsFromServer = async () => {
    try {
      if (!productId) {
        return;
      }

      const details = await getProductDetails(productId);

      setProductDetails(details);
    } catch {
      // eslint-disable-next-line no-console
      console.warn('product details loading error!');
    }
  };

  useEffect(() => {
    getProductDetailsFromServer();
    scrollToTop();
  }, [productId]);

  useEffect(() => {
    setCurrentPage('ProductDetails');
    scrollToTop();
  }, []);

  return (
    <>
      {productDetails ? (
        <>
          <div className="product-details__page">
            <PathBlock
              currentPage="Phones"
              item={productDetails?.name}
            />
            <BackButton />
            <ProductDetails productDetails={productDetails} />
            <section className="alternative-products__list">
              <div
                className="product-list__wrapper product-list__wrapper--short"
              >
                <ProductsSlider
                  title="You may also like"
                  products={products}
                />
              </div>
            </section>
          </div>
        </>
      ) : (
        <NotFoundPage title="Product was not found" />
      )}
    </>
  );
};
