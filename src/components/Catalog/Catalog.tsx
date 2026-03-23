import ProductList from '../ProductList/ProductList';
import './Catalog.scss';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api';
import Footer from '../Footer/Footer';
import { Product } from '../../types/Product';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="catalog">
      <h1 className="catalog__title">Mobile phones</h1>
      <p className="catalog__models--counter">{products.length} models</p>
      <ProductList products={products} />
      <div className="catalog__sliders">
        <div className="catalog__slider--left">
          <a href="" className="catalog__slider--left--icon"></a>
        </div>
        <div>
          <a href="" className="catalog__slider--number">
            1
          </a>
        </div>
        <div>
          <a href="" className="catalog__slider--number">
            2
          </a>
        </div>
        <div>
          <a href="" className="catalog__slider--number">
            3
          </a>
        </div>
        <div>
          <a href="" className="catalog__slider--number">
            4
          </a>
        </div>
        <div className="catalog__slider--right">
          <a href="" className="catalog__slider--right--icon"></a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
