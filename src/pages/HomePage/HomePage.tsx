import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/selectors/ProductsSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import { getProducts } from '../../store/reducers/ProductsSlice';
import { HomePageView } from './HomePageView';

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const {
    products,
  } = useSelector(selectProducts);

  const newestProducts = useMemo(() => [...products || []].sort((a, b) => {
    return b.year - a.year;
  }), [products]);

  const hotPricesProducts = useMemo(() => {
    return [...products || []]
      .sort((b, a) => (b.price - b.fullPrice) - (a.price - a.fullPrice));
  }, [products]);

  const phonesCount = useMemo(() => {
    return products?.filter(item => {
      return item.category === 'phones';
    }).length || 0;
  }, [products]);

  const tabletsCount = useMemo(() => {
    return products?.filter(item => {
      return item.category === 'tablets';
    }).length || 0;
  }, [products]);

  const accessoriesCount = useMemo(() => {
    return products?.filter(item => {
      return item.category === 'accessorie';
    }).length || 0;
  }, [products]);

  return (
    <HomePageView
      hotPricesProducts={hotPricesProducts}
      phonesCount={phonesCount}
      tabletsCount={tabletsCount}
      accessoriesCount={accessoriesCount}
      newestProducts={newestProducts}
    />
  );
};
