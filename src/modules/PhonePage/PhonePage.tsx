import style from './PhonePage.module.scss';
import { useContext, useMemo } from 'react';
import { StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';

export const PhonePage = () => {
  const { products } = useContext(StateContext);
  const phones = useMemo(
    () => getProducts.getProductByCategory(products, MenuItems.phones),
    [products],
  );

  return (
    <div className={style.phonePage_container}>
      <Catalog
        title="Mobile phones"
        products={phones ? phones : []}
      />
    </div>
  );
};
