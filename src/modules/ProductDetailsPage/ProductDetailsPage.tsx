import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../api';
import type { ProductFull } from '../../types/ProductFull';
import { Back } from '../shared/Back';
import { ProductDetails } from './components/ProductDetails';
import type { Product } from '../../types/Product';
import { CardsSlider } from '../shared/CardsSlider';
import s from './ProductDetailsPage.module.scss';

type Params = {
  productId?: string;
};

export const ProductDetailsPage = () => {
  const [detailedProducts, setDetailedProducts] = useState<ProductFull[]>([]);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams<Params>();

  // if (!productId) {
  //   return;
  // }

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getProducts<ProductFull>('phones'),
      getProducts<ProductFull>('tablets'),
      getProducts<ProductFull>('accessories'),
    ])
      .then(([x, y, z]) => setDetailedProducts([...x, ...y, ...z]))
      .catch(e => new Error(e))
      .finally(() => setLoading(false));

    getProducts<Product>('products').then(setCatalogProducts);
  }, []);

  const searchProduct = (
    namespaceId: string,
    color: string,
    capacity: string,
  ): string | undefined => {
    return detailedProducts.find(
      item =>
        item.namespaceId === namespaceId &&
        item.color === color &&
        item.capacity === capacity,
    )?.id;
  };

  const detailedProduct = useMemo(() => {
    return detailedProducts.find(product => product.id === productId);
  }, [detailedProducts, productId]);

  const catalogProduct = useMemo(() => {
    return catalogProducts.find(product => product.itemId === productId);
  }, [catalogProducts, productId]);

  return (
    <>
      {loading && <div>Loading...</div>}

      {!loading && detailedProduct && (
        <div>
          <Breadcrumbs
            type={detailedProduct.category}
            name={detailedProduct.name}
          />
          <Back />
          <ProductDetails
            product={detailedProduct}
            searchProduct={searchProduct}
            catalogProduct={catalogProduct}
          />
          <div className={s.productDetailsPage__slider}>
            <CardsSlider
              products={catalogProducts.sort(() => Math.random() - 0.5)}
              name="You may also like"
            />
          </div>
        </div>
      )}
    </>
  );
};
