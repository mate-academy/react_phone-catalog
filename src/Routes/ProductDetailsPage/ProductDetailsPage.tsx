import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton } from '../../components/Buttons/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductGallery } from '../../components/ProductGallery/ProductGallery';
import { Navbar } from '../../components/Navbar/Navbar';
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';
import { CapacityPicker } from '../../components/CapacityPicker/CapacityPicker';
import { ProductDetails } from '../../types/productDetails';
import { getProductDetails } from '../../helpers/requests';
import './ProductDetailsPage.scss';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton/PrimaryButton';
import { FavButton } from '../../components/Buttons/FavButton/FavButton';
import { Specifications } from '../../types/specifications';
import { SpecTable } from '../../components/SpecTable/SpecTable';
import { About } from '../../components/About/About';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { productId = '' } = useParams();

  const {
    name = '',
    images = [],
    colorsAvailable = [],
    capacityAvailable = [],
    priceRegular = 0,
    priceDiscount = 0,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
    description = [],
  } = selectedProduct || {};

  const productSpecs: Specifications = {
    Screen: screen,
    Resolution: resolution,
    Processor: processor,
    RAM: ram,
    'Built in memory': capacity,
    Camera: camera,
    Zoom: zoom,
    Cell: cell,
  };

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(productId)
      .then(setSelectedProduct)
      .finally(() => setIsLoading(false));
  }, [productId]);

  return (
    <>
      <Navbar />
      <section key={productId} className="product-details">
        <Breadcrumbs />

        <div className="product-details__back">
          <BackButton />
        </div>

        {selectedProduct && (
          <>
            <h1 className="product-details__name">
              {name}
              {isLoading && <Loader width={25} />}
            </h1>

            <div className="product-details__info">
              <ProductGallery key={productId} images={images} name={name} />

              <div className="product-details__settings">
                <div className="product-details__pickers">
                  <ColorPicker colors={colorsAvailable} productId={productId} />

                  <CapacityPicker
                    capacities={capacityAvailable}
                    productId={productId}
                  />
                </div>

                <p className="product-details__price">
                  {`$${priceDiscount}`}
                  <span className="product-details__price--strike">{`$${priceRegular}`}</span>
                </p>

                <div className="product-details__controls">
                  <PrimaryButton width={263} height={48} onClick={() => {}}>
                    Add to cart
                  </PrimaryButton>

                  <FavButton size={48} />
                </div>

                <SpecTable
                  style={{ fontSize: 12, fontWeight: 600 }}
                  specifications={productSpecs}
                  specCount={4}
                />
              </div>

              <p className="product-details__id">{`ID: ${productId}`}</p>
            </div>

            <div className="product-details__info">
              <About description={description} />

              <div className="product-details__specs">
                <h2 className="product-details__title">Tech Specs</h2>
                <SpecTable
                  style={{ fontSize: 14, fontWeight: 500 }}
                  specifications={productSpecs}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
