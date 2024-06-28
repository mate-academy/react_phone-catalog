import { useContext } from 'react';
import { StateProduct } from '../../context/ProductContext';
import './TabletsPage.scss';
import { getProductsByCategory } from '../../servises';
import Items from '../../components/Items/Items';

const TabletsPage = () => {
  const { products } = useContext(StateProduct);

  const tabletsProducts = getProductsByCategory(products, 'tablets');

  return (
    <div className="tabletsPage">
      <Items title="Tablets" items={tabletsProducts} />
    </div>
  );
};

export default TabletsPage;
