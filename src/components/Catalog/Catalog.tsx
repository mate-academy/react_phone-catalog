import ProductList from '../ProductList/ProductList';
import './Catalog.scss';

const Catalog = () => {
  return (
    <div className="catalog">
      <h1 className="catalog__title">Mobile phones</h1>
      <p className="catalog__models--counter">models</p>
      <ProductList />
    </div>
  );
};

export default Catalog;
