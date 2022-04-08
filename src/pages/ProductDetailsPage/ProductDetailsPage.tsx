import {
  FunctionComponent, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';

// Styles
import './ProductDetailsPage.scss';

// Types
import { ProductDetails } from '../../types/ProdyctDetails';
import { Product } from '../../types/Product';

// Api requests
import { getProductsDetails } from '../../api/getProductDetails';

// Components
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { Images } from '../../components/Images';
import { ProductInfo } from '../../components/ProductInfo';
import { TechSpecs } from '../../components/TechSpecs';
import { ProductsSlider } from '../../components/ProductsSlider';

export const ProductDetailsPage: FunctionComponent = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const { productId } = useParams();
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const selectedProduct: Product = products.find((product: Product) => product.id === productId);
  const techSpecs = [
    { key: 'Screen', value: selectedProduct?.screen },
    { key: 'Resolution', value: productDetails?.display.screenResolution },
    { key: 'Processor', value: productDetails?.display.screenResolution },
    { key: 'RAM', value: selectedProduct?.ram },
    { key: 'Built in memory', value: productDetails?.storage.ram },
    { key: 'Camera', value: productDetails?.camera.primary },
    { key: 'OS', value: productDetails?.android.os },
    { key: 'Cell', value: productDetails?.connectivity.cell },
  ];
  const randomProducts: Product[] = [];

  while (randomProducts.length < 8) {
    const randomIndex = Math.floor(Math.random() * 8);

    if (!randomProducts.includes(products[randomIndex])) {
      randomProducts.push(products[randomIndex]);
    }
  }

  useEffect(() => {
    getProductsDetails(productId)
      .then((productDetailsFromServer: ProductDetails) => {
        setProductDetails(productDetailsFromServer);
      });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  return (
    <>
      {!productDetails ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />

          <BackButton />

          <h1 className="ProductDetailsPage__title">{productDetails.name}</h1>

          <div className="ProductDetailsPage__content">
            <div className="ProductDetailsPage__info">

              <Images
                images={productDetails.images}
              />

              <ProductInfo product={selectedProduct} details={productDetails} />
            </div>

            <div className="ProductDetailsPage__description">
              <div>
                <h2 className="ProductDetailsPage__subTitle">
                  About
                </h2>

                <article>
                  {productDetails.description}
                </article>
              </div>

              <div>
                <h2 className="ProductDetailsPage__subTitle">
                  Tech specs
                </h2>

                <TechSpecs techSpecs={techSpecs} isTextSmall={false} />
              </div>
            </div>

            <ProductsSlider
              title="You may also like"
              products={randomProducts}
            />
          </div>
        </>
      )}
    </>
  );
};
