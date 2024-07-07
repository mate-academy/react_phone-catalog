import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import '../../Components/Product/Product.scss';
import { Product } from '../Product';

export const TabletsPage = () => {
  const { tablets } = useContext(ProductContext);

  return (
    <>
      <div className="products">
        <Product product={tablets} title={'Tablets'} />
      </div>
    </>
  );
};
