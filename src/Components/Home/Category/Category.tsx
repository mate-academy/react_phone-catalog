import { useEffect, useState } from 'react';
import './Category.scss';
import { getProductsFromApi } from '../../../utils/api';
import { Products } from '../../../types/Products';
import { Link } from 'react-router-dom';

export const Category = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProductsFromApi().then(goods => {
      setProducts(goods);
    });
  }, []);

  const phoneCount = products.filter(good => good.category === 'phones').length;
  const tabletCount = products.filter(
    good => good.category === 'tablets',
  ).length;
  const accsessoriesCount = products.filter(
    good => good.category === 'accessories',
  ).length;

  return (
    <div className="main">
      <h2>Shop by category</h2>
      <div className="category">
        <Link to="phones" className="category__info">
          <div className="block phone">
            <img
              src={`${import.meta.env.BASE_URL}/img/category-phones.webp`}
              alt=""
              className="block__phone"
            />
          </div>
          <p className="title">Mobile phones</p>
          <p className="count">{phoneCount} models</p>
        </Link>
        <Link to="tablets" className="category__info">
          <div className="block tablets">
            <img
              src={`${import.meta.env.BASE_URL}/img/category-tablets.png`}
              alt=""
              className="block__tablets"
            />
          </div>
          <p className="title">Tablets</p>
          <p className="count">{tabletCount} models</p>
        </Link>
        <Link to="accessories" className="category__info">
          <div className="block accessories">
            <img
              src={`${import.meta.env.BASE_URL}/img/category-accessories.png`}
              alt=""
              className="block__accessories"
            />
          </div>
          <p className="title">Accessories</p>
          <p className="count">{accsessoriesCount} models</p>
        </Link>
      </div>
    </div>
  );
};
