/* eslint-disable import/no-extraneous-dependencies */
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SelectedProduct } from '../components/SelectedProduct/SelectedProduct';
import { SelectedTechProduct } from '../types/SelectedTechProduct';
import { getTechProductByItemId } from '../api/api';
import { Loader } from '../components/Loader';
import { TechProductsContext } from '../stores/TechProductsContext';
import { BreadcrumbsMenu } from '../components/BreadcrumbsMenu/BreadcrumbsMenu';

export const ProductDetailsPage = () => {
  const {
    techProducts,
  } = useContext(TechProductsContext);
  const { productId } = useParams();

  const [
    selectProduct,
    setSelectProduct,
  ] = useState<SelectedTechProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const productCategory = techProducts
    .find(pr => pr.itemId === selectProduct?.id)?.category;

  useEffect(() => {
    setErrorMessage('');
    if (productId) {
      setLoading(true);

      getTechProductByItemId(productId)
        .then(setSelectProduct)
        .catch(() => setErrorMessage('Phone was not found'))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  return (
    <section className="App__selected-product selected-product-page">
      <div className="container">
        <div className="selected-product-page__content">

          {
            productCategory && (
              <BreadcrumbsMenu
                category={productCategory.slice(0, 1).toUpperCase()
                  + productCategory.slice(1, productCategory.length)}
                nameProduct={selectProduct?.name}
              />
            )
          }

          {loading && <Loader />}

          {!loading && errorMessage && <h1>{errorMessage}</h1>}

          {
            !loading && !errorMessage && selectProduct && (
              <SelectedProduct
                product={selectProduct}
              />
            )
          }
        </div>
      </div>
    </section>
  );
};
