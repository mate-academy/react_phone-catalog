import style from './HomePage.module.scss';
import { HeroModule } from './components/HeroModule';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Categories';
import { useFilters } from '../../store/FiltersContext';
import React, { useContext, useEffect, useMemo } from 'react';
import { ProductContext } from '../../store/ProductContext';

export const HomePage = React.memo(() => {
  const { loadProducts } = useContext(ProductContext);
  const filters = useFilters();

  useEffect(() => {
    if (!filters.productCard.length) {
      loadProducts();
    }
  }, [filters.productCard.length, loadProducts]);

  const newModels = useMemo(() => {
    return [...filters.productCard]
      .sort((a, b) => (a.year && b.year ? b.year - a.year : 0))
      .slice(0, 10);
  }, [filters.productCard]);

  const hotPrice = useMemo(() => {
    return [...filters.productCard]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 10);
  }, [filters.productCard]);

  return (
    <div className={style.main}>
      <h1 className={style.main__title}>Welcome to Nice Gadgets store!</h1>

      <div className={style.mainWrapper}>
        <HeroModule />
        <ProductsSlider products={newModels} title="Brand new models" />
        <Categories />
        <ProductsSlider products={hotPrice} title="Hot prices" />
      </div>
    </div>
  );
});

HomePage.displayName = 'HomePage';
