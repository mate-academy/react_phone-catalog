import { useEffect, useState } from 'react';
import './CartPage.scss';
import { getProducts } from '../../api/products';
import { Product } from '../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import Slider from 'react-slick';

export const CartPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const getNewestProducts = products.filter(product => product.year === 2022);

  const settings = {
    slideToScroll: 1,
    infinite: false,
    variableWidth: true,
  };

  return (
    <div className="CartPage">
      <div className="CartPage__navigation">
        <h2 className="CartPage__title">Brand new models</h2>
      </div>

      <Slider {...settings}>
        {getNewestProducts.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Slider>
    </div>
  );
};
