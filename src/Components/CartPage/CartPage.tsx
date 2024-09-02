import { useContext } from 'react';
import './CartPage.scss';
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
