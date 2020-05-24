import './ShopByCategory.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../interfaces';

export const ShopByCategory = ({ products }: { products: Product[] }) => {
  const phonesCount = products.filter(product => product.type === 'phone').length;
  const tabletsCount = products.filter(product => product.type === 'tablet').length;
  const accessoriesCount = products.filter(product => product.type === 'accessorie' || !product.type).length;


  return (
    <div className="ShopByCategory">
      <h1 className="ShopByCategory__title">Shop by category</h1>
      <nav className="ShopByCategory__nav">
        <ul className="ShopByCategory__list" >
          <li className="ShopByCategory__item" >
            <Link to="/phones" className="ShopByCategory__link ShopByCategory__link--phones"></Link>
            <h3 className="ShopByCategory__h3">Mobile phones</h3>
            <span
            className="ShopByCategory__models-count"
            >
              {`${phonesCount} models`}
            </span>
          </li>
          <li className="ShopByCategory__item" >
            <Link to="/tablets" className="ShopByCategory__link ShopByCategory__link--tablets"></Link>
            <h3 className="ShopByCategory__h3">Tablets</h3>
            <span
            className="ShopByCategory__models-count"
            >
              {`${tabletsCount} models`}
            </span>
          </li>
          <li className="ShopByCategory__item" >
            <Link to="/accessories" className="ShopByCategory__link ShopByCategory__link--accessories"></Link>
            <h3 className="ShopByCategory__h3">Accessories</h3>
            <span
            className="ShopByCategory__models-count"
            >
              {`${accessoriesCount} models`}
            </span>
          </li>
        </ul>



      </nav>
    </div>
  )
}
