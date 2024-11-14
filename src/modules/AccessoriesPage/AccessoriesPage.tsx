import style from './AccessoriesPage.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';

export const AccessoriesPage = () => {
  const { products } = useContext(StateContext);
  const accessories = getProducts.getProductByCategory(
    products,
    MenuItems.accessories,
  );

  return (
    <div className={style.tabletPage_container}>
      <Catalog
        title="Accessories"
        products={accessories ? accessories : []}
      />
    </div>
  );
};
