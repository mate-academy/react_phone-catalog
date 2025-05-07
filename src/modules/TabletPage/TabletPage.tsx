import style from './TabletPage.module.scss';
import { useContext, useEffect, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';

export const TabletPage = () => {
  const { products, showSearch } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const dispatch = useContext(DispatchContext);

  const tablets = useMemo(() => {
    const allTablets = getProducts.getProductByCategory(
      products,
      MenuItems.tablets,
    );

    return getProducts.getFilteredByQuery(
      allTablets,
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
        title="Tablets"
        products={tablets ? tablets : []}
      />
    </div>
  );
};
