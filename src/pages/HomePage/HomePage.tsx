import React, { useState, useEffect } from 'react';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../types/ProductItem';

import './homePage.scss';
import { ShopCategory } from '../../components/ShopCategory';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    fetch(`https://mate-academy.github.io/react_phone-catalog
/api/products.json`)
      .then((resp) => resp.json())
      .then((data: ProductItem[]) => setProducts(data));
  }, []);

  const hotPrice = () => {
    const hotPrices = [...products];

    return hotPrices.filter((item: ProductItem) => item.discount > 0);
  };

  const brandNew = () => {
    let brandNewList = [...products];

    brandNewList = brandNewList.filter((item: ProductItem) => (
      item.discount === 0
    ));

    return brandNewList.sort((a: ProductItem, b: ProductItem) => (
      b.price - a.price
    ));
  };

  return (
    <div className="home">
      <Banner />

      <div className="hot-prices">
        <ProductsSlider
          productsList={hotPrice()}
          title="Hot prices"
          sliderSettings={{
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          }}
        />
      </div>

      <ShopCategory />

      <div className="brand-new">
        <ProductsSlider
          productsList={brandNew()}
          title="Brand new"
          sliderSettings={{
            dots: false,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          }}
        />
      </div>
    </div>
  );
};
