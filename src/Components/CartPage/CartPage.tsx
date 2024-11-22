import { useContext } from 'react';
import './CartPage.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import Slider from 'react-slick';
import { CatalogContext } from '../CatalogProvider';

export const CartPage = () => {
  const { products } = useContext(CatalogContext);

  const getNewestProducts = products.filter(product => product.year === 2022);

  const settings = {
    slideToScroll: 1,
    infinite: false,
    variableWidth: true,
    className: 'CartPage__slider',
  };

  return (
    <div className="CartPage">
      <h2 className="CartPage__title">Brand new models</h2>

      <Slider {...settings}>
        {getNewestProducts.map(product => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Slider>
    </div>
  );
};
