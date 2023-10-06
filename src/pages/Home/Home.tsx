import { useContext, useMemo } from 'react';

import { Filter } from '../../types/Filter';
import { ProductsContext } from '../../contexts/ProductsContext';
import { filterProducts } from '../../helpers/filterProducts';

import CardSlider from '../../components/CardSlider/CardSlider';
import MainSlider from './MainSlider/MainSlider';
import Category from './Category/Category';

const Home = () => {
  const { phones, tablets, accessories } = useContext(ProductsContext);
  const hotProducts = useMemo(() => {
    return filterProducts(phones, Filter.HOT);
  }, [phones, filterProducts]);
  const brandProducts = useMemo(() => {
    return filterProducts(phones, Filter.BRAND);
  }, [phones, filterProducts]);

  return (
    <>
      <MainSlider />
      <CardSlider products={hotProducts} title="Hot prices" />
      <Category
        phonesLength={phones.length}
        tabletsLength={tablets.length}
        accessoriesLength={accessories.length}
      />
      <CardSlider products={brandProducts} title="Brand new models" />
    </>
  );
};

export default Home;
