import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { getProductsFromServer } from '../../helpers/api';
import { ProducCard } from '../../components/ProductCard/ProducCard';
import './PhonesPage.scss';

type Props = {
  type: string;
  text: string;
};

export const PhonesPage: React.FC<Props> = ({ type, text }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const query = searchParams.get('query') || '';
  const filter = searchParams.get('filter') || '';
  const page = searchParams.get('page') || '';
  const status = searchParams.get('age') || '';

  const getPhonesFromServer = () => {
    getProductsFromServer()
      .then((data: Product[]) => data.filter(item => (
        item.type === type
      )))
      .then(data => setProducts(data));
  };

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('age', e.target.value);
    searchParams.set('page', '1');

    history.push({
      search: searchParams.toString(),
    });
  };

  const changePage = (num: number) => {
    searchParams.set('page', num.toString());

    history.push({
      search: searchParams.toString(),
    });
  };

  const buttonChangePage = (num: number) => {
    const result = +page + num;

    searchParams.set('page', result.toString());

    history.push({
      search: searchParams.toString(),
    });
  };

  const changeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('filter', e.target.value);
    searchParams.set('page', '1');

    history.push({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    getPhonesFromServer();
  }, [type]);

  const filteredProducts = useMemo(() => {
    const sorted = [...products];
    const firstNum = +filter * (+page - 1);
    const secondNum = +filter * +page;

    switch (status) {
      case 'newest':
        return sorted.sort((a: {age: number}, b: {age: number}) => (
          a.age - b.age
        )).slice(firstNum, secondNum);
      case 'oldest':
        return sorted.sort((a: {age: number}, b: {age: number}) => (
          b.age - a.age
        )).slice(firstNum, secondNum);
      case 'alphabetically':
        return sorted.sort((a: {name: string}, b: {name: string}) => (
          a.name.localeCompare(b.name)
        )).slice(firstNum, secondNum);
      case 'low':
        return sorted.sort(
          (
            a: {price: number; discount: number},
            b: {price: number; discount: number},
          ) => (
            (a.price - a.price * (a.discount / 100)) - (b.price - b.price * (b.discount / 100))
          ),
        ).slice(firstNum, secondNum);
      case 'high':
        return sorted.sort(
          (
            a: {price: number; discount: number},
            b: {price: number; discount: number},
          ) => (
            (b.price - b.price * (b.discount / 100)) - (a.price - a.price * (a.discount / 100))
          ),
        ).slice(firstNum, secondNum);
      default:
        return sorted;
    }
  }, [products, status, page, filter]);

  const buttons = Array(Math.ceil(products.length / +filter)).fill(1);

  return (
    <>
      <h2 className="product__title">{text}</h2>
      <div className="product__filters">
        <select
          value={status}
          onChange={changeStatus}
          className="product__status"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="high">High price</option>
          <option value="low">Low price</option>
        </select>

        <select
          value={filter}
          onChange={changeFilter}
          className="product__filter"
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value={products.length}>All</option>
        </select>
      </div>
      <ul className="product-list">
        {
          filteredProducts.map(item => <ProducCard listItem={item} key={item.id} />)
        }
      </ul>
      <div className="product__buttons">
        <button
          className={cn('product__button')}
          onClick={() => buttonChangePage(-1)}
          type="button"
          disabled={+page - 1 === 0}
        >
          {'<'}
        </button>
        {
          buttons.map((_, index) => {
            return (
              <button
                key={Math.random() * 100}
                className={cn('product__button', { active: index + 1 === +page })}
                type="button"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            );
          })
        }
        <button
          className={cn('product__button')}
          onClick={() => buttonChangePage(1)}
          type="button"
          disabled={buttons.length === +page}
        >
          {'>'}
        </button>
      </div>
      {
        !products.length
        && <h1>Product out of stock</h1>
      }
    </>
  );
};
