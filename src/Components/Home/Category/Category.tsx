import { useEffect, useState } from 'react';
import './Category.scss';
import { getProductsFromApi } from '../../../utils/api';
import { Products } from '../../../types/Products';

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
      Shop by category
      <div className="category">
        <div className="category__info">
          <div className="block phone">
            <img
              src={`${import.meta.env.BASE_URL}/img/category-phones.webp`}
              alt=""
              className="block__phone"
            />
          </div>
          <p className="title">Mobile phones</p>
          <p className="count">{phoneCount} models</p>
        </div>
        <div className="category__info">
          <div className="block tablets">
            <img
              src={`${import.meta.env.BASE_URL}/img/category-tablets.png`}
              alt=""
              className="block__tablets"
            />
          </div>
          <p className="title">Tablets</p>
          <p className="count">{tabletCount} models</p>
        </div>
        <div className="category__info">
          <div className="block accessories">
            <img
              src={`${import.meta.env.BASE_URL}/img/category-accessories.png`}
              alt=""
              className="block__accessories"
            />
          </div>
          <p className="title">Accessories</p>
          <p className="count">{accsessoriesCount} models</p>
        </div>
      </div>
    </div>
  );
};
