import { useContext, useEffect } from 'react';
import { BanerSlider } from '../../components/banerSlider/BanerSlider';
import { Catalogs } from '../../components/catalogs/Catalogs';
import { Catalog } from '../../components/productSlider/ProductSlider';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import './home.scss';

export const Home = () => {
  const [state, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then(res => res.json())
      .then(res => dispatch({ type: 'addCatalog', list: res }));
  });

  const banners = [
    '../../img/banners/banner-accessories.png',
    '../../img/banners/banner-phones.png',
    '../../img/banners/banner-tablets.png'];

  return (
    <section className="contant">
      <BanerSlider listElements={banners} />
      <Catalog
        title="Hot prices"
        list={state.catalogsProducts.filter((el:Product) => el.discount)}
      />
      <Catalogs />
      <Catalog
        title="Brand new models"
        list={state.catalogsProducts.filter((el:Product) => !el.discount)}
      />
    </section>
  );
};
