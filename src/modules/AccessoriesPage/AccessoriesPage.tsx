import style from './AccessoriesPage.module.scss';
import { useContext, useEffect, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';
import { SearchParams } from '../../types/SearchParams';
import { useSearchParams } from 'react-router-dom';

export const AccessoriesPage = () => {
  const { products, showSearch } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const dispatch = useContext(DispatchContext);

  const accessories = useMemo(() => {
    const allAccessories = getProducts.getProductByCategory(
      products,
      MenuItems.accessories,
    );

    return getProducts.getFilteredByQuery(
      allAccessories,
      searchParams.get(SearchParams.query),
    );
  }, [products, searchParams]);

  useEffect(
    () => dispatch({ type: 'setShowSearch', payload: true }),
    [dispatch, showSearch],
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
