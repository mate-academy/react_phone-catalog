import style from './PhonePage.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';

export const PhonePage = () => {
  const { products } = useContext(StateContext);
  const phones = getProducts.getProductByCategory(products, MenuItems.phones);

  return (
    <div className={style.phonePage_container}>
      <Catalog
        title="Mobile phones"
        products={phones ? phones : []}
      />
    </div>
  );
};
