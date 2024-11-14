import style from './TabletPage.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';

export const TabletPage = () => {
  const { products } = useContext(StateContext);
  const tablet = getProducts.getProductByCategory(products, MenuItems.tablets);

  return (
    <div className={style.tabletPage_container}>
      <Catalog
        title="Tablets"
        products={tablet ? tablet : []}
      />
    </div>
  );
};
