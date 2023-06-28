import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton } from '../../components/UI/BackButton/BackButton';
import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { ProductGallery } from '../../components/ProductDetailsPage/ProductGallery/ProductGallery';
import { ColorPicker } from '../../components/ProductDetailsPage/ColorPicker/ColorPicker';
import { CapacityPicker } from '../../components/ProductDetailsPage/CapacityPicker/CapacityPicker';
import { ProductDetails } from '../../types/productDetails';
import { getProductDetails } from '../../helpers/requests';
import { PrimaryButton } from '../../components/UI/PrimaryButton/PrimaryButton';
import { FavButton } from '../../components/UI/FavButton/FavButton';
import { Specifications } from '../../types/specifications';
import { SpecTable } from '../../components/SpecTable/SpecTable';
import { About } from '../../components/ProductDetailsPage/About/About';
import { Loader } from '../../components/UI/Loader/Loader';
import { useCart } from '../../contexts/cartContext';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { productId = '' } = useParams();
  const { addCartItem, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === productId);

  const {
    name = '',
    images = [],
    colorsAvailable = [],
    capacityAvailable = [],
    priceRegular = 0,
    priceDiscount = 0,
    screen = '',
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
    <main key={productId} className="product-details">
      <Breadcrumbs />
      <BackButton />
      {selectedProduct && (
        <>
          <h1 className="product-details__name">
            {name}
            {isLoading && <Loader width={25} />}
          </h1>

          <div className="product-details__info">
            <ProductGallery key={productId} images={images} name={name} />

            <div>
              <ColorPicker colors={colorsAvailable} productId={productId} />

              <CapacityPicker
                capacities={capacityAvailable}
                productId={productId}
              />

              <p className="product-details__price">
                {`$${priceDiscount}`}
                <span className="product-details__price--strike">{`$${priceRegular}`}</span>
              </p>

              <div className="product-details__controls">
                <PrimaryButton
                  isActive={isInCart}
                  width={263}
                  height={48}
                  onClick={() =>
                    addCartItem({
                      name,
                      price: priceDiscount,
                      image: images[0],
                      itemId: productId,
                    })}
                >
                  Add to cart
                </PrimaryButton>

                <FavButton product={selectedProduct} size={48} productId={productId} />
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
    </main>
  );
};
