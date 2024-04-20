import React, { useEffect, useState } from 'react';
import { Products } from '../../type/Products';
import './FilterProducts.scss';
import { CradList } from '../Cards/CardList/CardList';

type Props = {
  products: Products[];
};

export const FilterProducts: React.FC<Props> = ({ products }) => {
  const [count, setCount] = useState(8);
  const [visibelProduct, setVisibelProduct] = useState(products);
  const [sort, setSort] = useState(products);

  useEffect(() => {
    if (count !== undefined) {
      setVisibelProduct(products.slice(0, 0 + count));
    }
  }, [count, products, sort]);

  const handlerCount = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(+event.target.value);
  };

  const handlerSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'id':
        return setSort(visibelProduct.sort((a, b) => a.id - b.id));
      case 'year':
        return setSort(visibelProduct.sort((a, b) => a.year - b.year));
      case 'price':
        return setSort(visibelProduct.sort((a, b) => a.price - b.price));
      default:
        return setSort(visibelProduct);
    }
  };

  console.log(visibelProduct);

  return (
    <div className="filter-container">
      <div className="filter-items">95 models</div>
      <div className="filter-menu">
        <div className="filter-by filter-position">
          <span>Sort by</span>
          <select className="filter_select" onChange={handlerSort}>
            <option value="id">id</option>
            <option value="price">price</option>
            <option value="year">year</option>
          </select>
        </div>

        <div className="filter-count filter-position">
          <span>Items on page</span>
          <select className="filter_select" onChange={handlerCount}>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </div>
      </div>
      <CradList products={visibelProduct} />
    </div>
  );
};
