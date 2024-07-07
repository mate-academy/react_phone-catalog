import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import './HomePage.scss';
import { Loader } from '../Loader';
import { PictureSlider } from '../PicturesSlider/PictureSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';
import { getNewModels } from '../../utils/getNewModels';
import { getHotPrices } from '../../utils/getHotPrices';

export interface CarouselItem {
  img: string;
}

export const HomePage = () => {
  const { loading, phones, tablets, accessories } = useContext(ProductContext);

  const products = [...phones, ...tablets, ...accessories];

  const newPhone = getNewModels(phones);

  const hotPrices = getHotPrices(products);

  const items: CarouselItem[] = [
    { img: 'img/banner-tablets.png' },
    { img: 'img/banner-phones.png' },
    { img: 'img/banner-accessories.png' },
  ];

  return (
    <div className="home__page container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="home__page__wrapper">
            <h1 className="main-title">Welcome to Nice Gadgets store!</h1>
            <PictureSlider items={items} />

            <ProductsSlider title={'Brand new models'} products={newPhone} />
            <ShopByCategory />
            <ProductsSlider title={'Hot Prices'} products={hotPrices} />
          </div>
        </>
      )}
    </div>
  );
};
