import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './ProductDetailsPage.scss';
import { client } from '../../client/httpClient';
import { ProductPage } from '../../types/ProductPage';
import { Loader } from '../../components/Loader/Loader';
import { ProductOrder } from '../../components/ProductOrder/ProductOrder';
import {
  ProductPageHeader,
} from '../../components/ProductPageHeader/ProductPageHeader';
import {
  ProductPagePhotos,
} from '../../components/ProductPagePhotos/ProductPagePhotos';
import { ProductAbout } from '../../components/ProductAbout/ProductAbout';
import { ProductSpecs } from '../../components/ProductSpecs/ProductSpecs';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { usePhones } from '../../hooks/usePhones';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const productIdParts = productId?.split('-') || [];
  const productIdColor = productIdParts[productIdParts.length - 1];
  const productIdCapacity = productIdParts[productIdParts.length - 2];
  const navigate = useNavigate();

  const {
    products,
    setProducts,
  } = usePhones();

  const [
    productData,
    setProductData,
  ] = useState<ProductPage>({} as ProductPage);

  const [isLoading, setIsLoading] = useState(false);

  const [
    currentPhoto,
    setCurrentPhoto,
  ] = useState<string>('');

  const getPreparedLink = (
    color: string,
    capacity: string,
  ) => {
    const preparedProductId = productId
      ?.replace(productIdColor, color)
      .replace(productIdCapacity, capacity.toLowerCase());

    return `../${preparedProductId}`;
  };

  const handleParamsSelect = ({
    color = productIdColor,
    capacity = productIdCapacity,
  }) => {
    const link = getPreparedLink(color, capacity);

    navigate(link);
  };

  const {
    images = [],
    name = '',
    priceRegular = 0,
    priceDiscount = 0,
    colorsAvailable = [],
    capacityAvailable = [],
    screen = '',
    ram = '',
    processor = '',
    resolution = '',
    capacity = '',
    camera = '',
    zoom = '',
    cell = [],
    description = [],
  } = productData as ProductPage;

  const getSuggestedProducts = (productsList: Product[]): Product[] => {
    const preparedProducts = productsList.filter(product => (
      ram === product.ram || capacity === product.capacity
      || screen === product.screen
    ));

    return preparedProducts;
  };

  useEffect(() => {
    setIsLoading(true);

    client.get<Product[]>('products.json')
      .then(setProducts);

    client.get<ProductPage>(`products/${productId}.json`)
      .then((product) => {
        setProductData(product);
        setCurrentPhoto(product.images[0]);
      })
      .finally(() => setIsLoading(false));
  }, [productId, setProducts]);

  return (
    <>
      <section className="product">
        {isLoading && (
          <Loader />
        )}

        {!isLoading && (
          <>
            <ProductPageHeader
              productName={name}
            />

            <div className="product__content">
              <ProductPagePhotos
                images={images}
                currentPhoto={currentPhoto}
                setCurrentPhoto={setCurrentPhoto}
                name={name}
              />

              <ProductOrder
                availableColors={colorsAvailable}
                availableCapacity={capacityAvailable}
                selectParam={handleParamsSelect}
                currentColor={productIdColor}
                currentCapacity={productIdCapacity.toUpperCase()}
                price={priceDiscount}
                fullPrice={priceRegular}
                screen={screen}
                resolution={resolution}
                ram={ram}
                processor={processor}
              />

              <ProductAbout
                productDescr={description}
              />

              <ProductSpecs
                screen={screen}
                resolution={resolution}
                processor={processor}
                ram={ram}
                memory={capacity}
                camera={camera}
                zoom={zoom}
                cell={cell}
              />

              <ProductsList
                products={getSuggestedProducts(products)}
                title="You also may like"
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
