import ProductList from '../ProductList/ProductList';
import './Catalog.scss';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api';
import Footer from '../Footer/Footer';
import { Product } from '../../types/Product';
import HomeIcon from '../../../public/img/icons/icon--home.png';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortType, setSortType] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as 'newest' | 'oldest');
  };

  const productPhones = products.filter(
    product => product.category === 'phones',
  );
  const sortedProducts = [...productPhones].sort((product1, product2) => {
    if (sortType === 'newest') {
      return product2.year - product1.year;
    }

    return product1.year - product2.year;
  });

  return (
    <div className="catalog">
      <div className="catalog__top--icons">
        <a href="#home">
          <img src={HomeIcon} alt="" className="catalog__icon--home" />
        </a>
        <a href="" className="catalog__icon--slider--right--gray"></a>
        <p className="catalog__top--text">Phones</p>
      </div>
      <h1 className="catalog__title">Mobile phones</h1>
      <p className="catalog__models--counter">{productPhones.length} models</p>
      <div className="catalog__sort">
        <label className="catalog__title--sort" htmlFor="sort">
          Sort by
        </label>
        <div className="catalog__select-wrapper">
          <select id="sort" value={sortType} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <ProductList products={sortedProducts} />
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
