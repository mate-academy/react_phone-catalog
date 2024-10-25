import { useEffect, useState } from 'react';

import { Slider } from '../../components/slider/Slider';
import { ProductSlider } from '../../components/productsSlider/ProductSlider';

import { Product } from '../../types/Product';

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [modelsCounter, setModelsCounter] = useState({
    phones: 0,
    tablets: 0,
    accessoirs: 0,
  });

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    const counter = {
      phones: 0,
      tablets: 0,
      accessoirs: 0,
    };

    products.forEach(prod => {
      switch (prod.category) {
        case 'phones':
          counter.phones++;
          break;
        case 'tablets':
          counter.tablets++;
          break;
        case 'accessories':
          counter.accessoirs++;
          break;
      }
    });

    setModelsCounter(counter);
  }, [products]);

  return (
    <div className="homePage">
      <div className="homePage__topContainer">
        <h1 className="homePage__title">Welcome to Nice Gadgets store!</h1>
        <Slider />
      </div>
      <ProductSlider products={products} title="Brand new models" />
      <div className="categories">
        <h2 className="categories__title">Shop by category</h2>
        <div className="categories__links">
          <div className="categories__item">
            <a
              href=""
              className="categories__photos categories__photos--phone"
            />
            <a href="">
              <h4 className="categories__name">Mobile phones</h4>
            </a>
            <span className="categories__count">{`${modelsCounter.phones} models`}</span>
          </div>
          <div className="categories__item">
            <a
              href=""
              className="categories__photos categories__photos--tablet"
            />
            <a href="">
              <h4 className="categories__name">Tablets</h4>
            </a>
            <span className="categories__count">{`${modelsCounter.tablets} models`}</span>
          </div>
          <div className="categories__item">
            <a
              href=""
              className="categories__photos categories__photos--accessoirs"
            />
            <a href="">
              <h4 className="categories__name">Accessoirs</h4>
            </a>
            <span className="categories__count">{`${modelsCounter.accessoirs} models`}</span>
          </div>
        </div>
      </div>
      <ProductSlider products={products} title="Hot prices" showSale={true} />
    </div>
  );
};
