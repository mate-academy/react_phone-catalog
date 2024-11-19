import style from './PhonePage.module.scss';
import { useContext, useEffect, useMemo } from 'react';
import { DispatchContext, StateContext } from '../../components/GlobalProvider';
import { Catalog } from '../../components/Catalog/Catalog';
import { getProducts } from '../../utils/getProducts';
import { MenuItems } from '../../types/MenuItems';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';

export const PhonePage = () => {
  const { products, showSearch } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const dispatch = useContext(DispatchContext);

  const phones = useMemo(() => {
    const allPhones = getProducts.getProductByCategory(
      products,
      MenuItems.phones,
    );

    return getProducts.getFilteredByQuery(
      allPhones,
      searchParams.get(SearchParams.query),
    );
  }, [products, searchParams]);

  useEffect(
    () => dispatch({ type: 'setShowSearch', payload: true }),
    [dispatch, showSearch],
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
