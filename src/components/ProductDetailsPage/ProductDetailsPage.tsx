import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton } from '../BackButton/BackButton';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { ProductGallery } from '../ProductGallery/ProductGallery';
import { Navbar } from '../Navbar/Navbar';
import { getProductDetails } from '../../helpers/requests';
import { ProductDetails } from '../../types/productDetails';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null,
  );
  const { productId } = useParams();

  useEffect(() => {
    getProductDetails(productId as string).then(setSelectedProduct);
  }, []);

  return (
    <>
      <Navbar />

      <section className="product-details">
        <div className="product-details__crumbs">
          <Breadcrumbs />
        </div>

        <div className="product-details__back">
          <BackButton />
        </div>

        {selectedProduct && (
          <>
            <h1 className="product-details__name">{selectedProduct?.name}</h1>

            <ProductGallery
              images={selectedProduct.images}
              name={selectedProduct.name}
            />
          </>
        )}
      </section>
    </>
  );
};
