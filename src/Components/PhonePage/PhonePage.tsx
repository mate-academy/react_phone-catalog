import '../../Components/Product/Product.scss';
import { Product } from '../Product';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';

export const PhonePage = () => {
  const { phones } = useContext(ProductContext);

  return (
    <>
      <div className="products">
        <Product product={phones} title={'Mobile phones'} />
      </div>
    </>
  );
};
