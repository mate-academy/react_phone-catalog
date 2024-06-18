import { useContext } from 'react';
import { FilterProducts } from '../FilterProducts';
import { Context } from '../../Store/Store';
import { Link } from 'react-router-dom';
import './Phones.scss';

export const Phones = () => {
  const { products } = useContext(Context);

  return (
    <div className="phones-page">
      <div className="link-block">
        <Link to={`/`}>
          <img src="img/icons/home_icon.svg" alt="home" />
        </Link>
        <span>
          <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
        </span>
        <Link to={`/phones`}>Phones</Link>
      </div>
      <h1>Mobile phones</h1>

      <div className="filter-items">{`${products.length} models`}</div>
      <FilterProducts products={products}></FilterProducts>
    </div>
  );
};
