import { useEffect, useState } from 'react';
import { Category } from './components/Category';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { Products, CatalogProduct } from '../shared/types/Products';
import {
  getAllDetailedProducts,
  getProductsFromApi,
} from '../shared/utils/api';

const SLIDER_LIMIT = 15;

export const HomePage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    getAllDetailedProducts().then(setProducts);
    getProductsFromApi().then(setCatalog);
  }, []);

  const yearById = new Map(catalog.map(item => [item.itemId, item.year]));

  const hotPriceProducts = [...products]
    .filter(product => product.priceDiscount < product.priceRegular)
    .sort(
      (a, b) =>
        b.priceRegular - b.priceDiscount - (a.priceRegular - a.priceDiscount),
    )
    .slice(0, SLIDER_LIMIT);

  const newestProducts = [...products]
    .filter(product => yearById.has(product.id))
    .sort((a, b) => (yearById.get(b.id) ?? 0) - (yearById.get(a.id) ?? 0))
    .slice(0, SLIDER_LIMIT);

  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <PicturesSlider />
      <ProductsSlider product={hotPriceProducts} isShowDiscount />
      <Category />
      <ProductsSlider product={newestProducts} />
    </>
  );
};
