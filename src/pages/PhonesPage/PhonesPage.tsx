import { useContext } from 'react';
import { StateProduct } from '../../context/ProductContext';
import './PhonesPage.scss';
import { getProductsByCategory } from '../../servises';
import Items from '../../components/Items/Items';

const PhonesPage = () => {
  const { products } = useContext(StateProduct);

  const phonesProducts = getProductsByCategory(products, 'phones');

  return (
    <div className="phonePage">
      <Items title="Mobile phones" items={phonesProducts} />
    </div>
  );
};

export default PhonesPage;
