import React, { useEffect, useMemo, useState } from 'react';
import { DetailProductType } from '../types/ProductType';
import accessories from '../../public/api/accessories.json';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import { Loader } from '../modules/shared/components/Loader';
import { useLocation, useParams } from 'react-router-dom';

interface ProductDetailContextType {
  detailProduct: DetailProductType | null;
}

export const ProductDetailContext =
  React.createContext<ProductDetailContextType>({
    detailProduct: phones[0] || tablets[0] || accessories[0],
  });

type Props = {
  children: React.ReactNode;
};

const productsObj = {
  phones: phones,
  accessories: accessories,
  tablets: tablets,
};

type ProductCategory = keyof typeof productsObj;

export const ProductDetailProvider: React.FC<Props> = ({ children }) => {
  const [detailProduct, setDetailProduct] = useState<DetailProductType | null>(
    null,
  );

  const { productId } = useParams();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const getCategoryFromPath = (path: string): ProductCategory => {
    return path.split('/')[1].toLowerCase() as ProductCategory;
  };

  useEffect(() => {
    const category = getCategoryFromPath(pathname);
    const categoryProducts: DetailProductType[] = productsObj[category] || [];

    const fetchProducts = async () => {
      const response = await new Promise<DetailProductType>(resolve =>
        setTimeout(() => {
          const findProd = categoryProducts.find(prod => prod.id === productId);

          if (productId && !findProd) {
            // eslint-disable-next-line no-console
            console.error(
              `Product with ID ${productId} not found in ${category}`,
            );
          }

          resolve(findProd as DetailProductType);
        }, 1000),
      );

      setDetailProduct(response);
      setLoading(false);
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const valueProps = useMemo(
    () => ({
      detailProduct,
    }),
    [detailProduct],
  );

  return (
    <ProductDetailContext.Provider value={valueProps}>
      {loading ? <Loader /> : children}
    </ProductDetailContext.Provider>
  );
};
