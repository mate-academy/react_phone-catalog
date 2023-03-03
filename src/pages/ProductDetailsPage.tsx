import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './page.scss';
import '../helpers/grid.scss';

import { Header } from '../components/Header/Header';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Product, ProductDet } from '../types/Product';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { Footer } from '../components/Footer/Footer';
import {
  SuggestedProducts,
} from '../components/SuggestedProducts/SuggestedProducts';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

type Props = {
  products: Product[];
};

export const ProductDetailsPage: React.FC<Props> = ({ products }) => {
  const [productDetails, setProductDetails] = useState<ProductDet>();
  const { productId = '' } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/${productId}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(setProductDetails);
  });

  const selectedProduct = products
    .find(product => product.id === productDetails?.id);

  return (
    <div className="page">
      <Header />

      <div className="page__content">
        <div className="page__links-wrapper">
          <Breadcrumbs
            link={selectedProduct?.type || ''}
            text={selectedProduct?.name || ''}
          />
        </div>

        <Link
          to="../"
          className="page__link-back"
          data-cy="backButton"
        >
          Back
        </Link>

        <section className="page__section">
          <h1 className="page__title page__title--margin-40">
            {productDetails?.name}
          </h1>

          {selectedProduct && (
            <ProductDetails
              productDetails={productDetails}
              selectedProduct={selectedProduct}
            />
          )}
        </section>

        {selectedProduct && (
          <SuggestedProducts selectedProduct={selectedProduct} />
        )}
      </div>

      <Footer />
    </div>
  );
};
