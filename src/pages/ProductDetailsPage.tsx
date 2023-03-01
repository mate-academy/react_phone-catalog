import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../helpers/page.scss';
import '../helpers/grid.scss';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { PagesLinks } from '../components/PagesLinks';
import { Product, ProductDet } from '../types/Product';
import { ProductDetails } from '../components/ProductDetails';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products';

type Props = {
  products: Product[];
  // addProductToCart: (product: Product) => void;
  // addProductToFavourites: (product: Product) => void;
};

export const ProductDetailsPage: React.FC<Props> = ({
  products,
  // addProductToCart,
  // addProductToFavourites,
}) => {
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
          <PagesLinks />
        </div>

        <h1 className="page__title">
          {productDetails?.name}
        </h1>

        {selectedProduct && (
          <ProductDetails
            productDetails={productDetails}
            selectedProduct={selectedProduct}
            // addProductToCart={addProductToCart}
            // addProductToFavourites={addProductToFavourites}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};
