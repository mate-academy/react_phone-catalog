import { useEffect, useState } from 'react';
import { ProductList } from '../ProductCard/ProductList';
import { Slider } from '../Slider/Slider';
import './ProductsSlider.scss';
import { ShopCategory } from '../shopCategory/ShopCategory';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as actions from '../features/ProductsSlicer';
import { Product } from '../../types/product';

export const ProductsSlider = () => {
  const dispatch = useAppDispatch();
  const { items: products, loaded } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(actions.productsInit());
  }, [dispatch]);

  const [sortedProducts, setSortProducts] = useState<Product[]>([]);

  useEffect(() => {
    const updatedProducts = [...products];

    updatedProducts.sort((a, b) => (b.year - a.year));

    setSortProducts(updatedProducts);
  }, [products]);

  return (
    <>
      <div className="product-slider-container">
        <Slider />
        <ProductList
          products={products}
          title="Hot prices"
          loaded={loaded}
        />
        <h1 className="product-slider__title">Shop by category</h1>
        <ShopCategory products={products} />
        <ProductList
          products={sortedProducts}
          title="Brand new models"
          loaded={loaded}
        />
      </div>
    </>
  );
};
