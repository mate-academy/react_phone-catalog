import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ProdSpec, ProductDetails } from '../types/Product';
import { Spec } from '../shared/components/ProductSpecs';
import { useParams } from 'react-router-dom';
import { ProductDetailsType } from '../types/ProductDetailsType';
import { ProductContext } from './ProductContext';

export const ProductDetailsContext =
  React.createContext<ProductDetailsType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const ProductDetailsProvider: React.FC<Props> = ({ children }) => {
  const [productDetails, setProductDetails] = useState<
    ProductDetails | undefined
  >(undefined);
  const [productSpec, setProductSpec] = useState<Spec[]>([]);
  const [isLoadingId, setIsLoadingId] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { products, isDataReady } = useContext(ProductContext);
  const { productId } = useParams();

  const validId = productId ? productId.toString() : '';

  useEffect(() => {
    if (!validId || !isDataReady) {
      return;
    }

    setIsLoadingId(true);

    const product = products.find(p => p.itemId === validId);

    if (!product) {
      setHasError(true);
      setIsLoadingId(false);
      setIsInitialized(true);

      return;
    }

    const category = product.category;

    fetch(`api/${category}.json`)
      .then(result => result.json())
      .then((data: ProductDetails[]) => {
        const detailedProduct = data.find(p => p.id === validId);

        if (data) {
          setProductDetails(detailedProduct);
        } else {
          setHasError(true);
        }

        if (!detailedProduct) {
          setHasError(true);

          return;
        }

        const specsObj: ProdSpec = {
          screen: detailedProduct.screen,
          resolution: detailedProduct.resolution,
          processor: detailedProduct.processor,
          ram: detailedProduct.ram,
          capacity: detailedProduct.capacity,
          cell: detailedProduct.cell,
        };

        if (detailedProduct.camera && detailedProduct.zoom) {
          specsObj.camera = detailedProduct.camera;
          specsObj.zoom = detailedProduct.zoom;
        }

        const arr: Spec[] = Object.entries(specsObj).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          value: Array.isArray(value) ? value.join(', ') : value,
        }));

        const names = [
          'Screen',
          'Resolution',
          'Processor',
          'Ram',
          'Capacity',
          'Camera',
          'Zoom',
          'Cell',
        ];

        const filteredSpecs: Spec[] = [];

        names.forEach(name => {
          arr.find(a => {
            if (a.name === name) {
              filteredSpecs.push(a);
            }
          });
        });

        setProductSpec(filteredSpecs);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoadingId(false);
        setIsInitialized(true);
      });
  }, [validId, products, isDataReady]);

  const value = useMemo(
    () => ({
      productSpec,
      productDetails,
      isLoadingId,
      hasError,
      isInitialized,
    }),
    [productSpec, productDetails, isLoadingId, hasError, isInitialized],
  );

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export const useDetails = () => {
  const details = useContext(ProductDetailsContext) as ProductDetailsType;

  return details;
};
