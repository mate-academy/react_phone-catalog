import { useContext } from 'react';
import { StateProduct } from '../../context/ProductContext';
import './AccessoriesPage.scss';
import { getProductsByCategory } from '../../servises';
import Items from '../../components/Items/Items';

const AccessoriesPage = () => {
  const { products } = useContext(StateProduct);

  const accessoriesProducts = getProductsByCategory(products, 'accessories');

  return (
    <div className="accessoriesPage">
      <Items title="Accessories" items={accessoriesProducts} />
    </div>
  );
};

export default AccessoriesPage;
