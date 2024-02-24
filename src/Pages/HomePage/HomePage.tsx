import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ProductSlider } from '../../components/ProductSlider';
import { Slider } from '../../components/Slider';
import './HomePage.scss';
import { ShopByCategory } from '../../components/ShopByCaregory';
import { selectProducts } from '../../store/selectors/ProductsSlice';
import { useAppDispatch } from '../../store/hooks/redux';
import { getProducts } from '../../store/reducers/ProductsSlice';

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
    }).length;
  }, [products]);

  const tabletsCount = useMemo(() => {
    return products?.filter(item => {
      return item.category === 'tablets';
    }).length;
  }, [products]);

  const accessoriesCount = useMemo(() => {
    return products?.filter(item => {
      return item.category === 'accessorie';
    }).length;
  }, [products]);

  return (
    <div className="home-page">
      <Slider />
      <section className="home-page__section">
        <ProductSlider title="Hot Prices" products={hotPricesProducts || []} />
      </section>
      <section className="home-page__section">
        <ShopByCategory
          phonesCount={phonesCount || 0}
          tabletsCount={tabletsCount || 0}
          accessoriesCount={accessoriesCount || 0}
        />
      </section>
      <section className="home-page__section">
        <ProductSlider
          title="Brand new models"
          products={newestProducts || []}
        />
      </section>

    </div>
  );
};
