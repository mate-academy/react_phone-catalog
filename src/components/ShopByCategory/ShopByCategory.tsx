import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

import cat from '../../../public/img/category-phones.webp';
import cat1 from '../../../public/img/category-tablets.webp';
import cat2 from '../../../public/img/category-accessories.webp';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const { allProducts } = useContext(GlobalContext);

  const getProductQuantity = (type: string) => {
    return allProducts.filter(product => product.category === type).length;
  };

  const phonesQuantity = getProductQuantity('phones');
  const tabletsQuantity = getProductQuantity('tablets');
  const accessoriesQuantity = getProductQuantity('accessories');

  return (
    <div className="shop">
      <div className="shop__content">
        <h2 className="shop__title">Shop by category</h2>
        <div className="shop__blocks">
          <a href="#/" className="shop__block">
            <div className="shop__block-pic shop__block-pic--1">
              <img src={cat} alt="block-img" className="shop__image" />
            </div>
            <span className="shop__block-title">Mobile phones</span>
            <span className="shop__block-desc">{`${phonesQuantity} Models`}</span>
          </a>
          <a href="#/" className="shop__block">
            <div className="shop__block-pic shop__block-pic--2">
              <img src={cat1} alt="block-img" className="shop__image" />
            </div>
            <span className="shop__block-title">Tablets</span>
            <span className="shop__block-desc">{`${tabletsQuantity} Models`}</span>
          </a>
          <a href="#/" className="shop__block">
            <div className="shop__block-pic shop__block-pic--3">
              <img
                src={cat2}
                alt="block-img"
                className="shop__image shop__image--last"
              />
            </div>
            <span className="shop__block-title">Accessories</span>
            <span className="shop__block-desc">{`${accessoriesQuantity} Models`}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
