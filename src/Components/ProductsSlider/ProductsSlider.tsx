import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { ProductList } from '../ProductCard/ProductList';
import { Slider } from '../Slider/Slider';
import './ProductsSlider.scss';
import { getProducts } from '../../api/products';
import { ShopCategory } from '../shopCategory/ShopCategory';

export const ProductsSlider = () => {
  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  useEffect(() => {
    getProducts().then((response) => {
      const sortedProducts = response.slice();

      sortedProducts.sort((a, b) => (b.year - a.year));

      setNewProducts(sortedProducts);
    });
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  const [newProducts, setNewProducts] = useState<Product[]>([]);

  return (
    <>
      {/* <SliderSwiper `/> */}
      <div className="product-slider-container">
        <Slider />
        <ProductList products={products} title="Hot prices" />
        <h1 className="product-slider__title">Shop by category</h1>
        <ShopCategory products={products} />
        <ProductList products={newProducts} title="Brand new models" />
      </div>
    </>
  );
};
