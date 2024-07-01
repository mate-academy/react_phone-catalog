import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import './HomePage.scss';
import { Loader } from '../Loader';
import { PictureSlider } from '../PicturesSlider/PictureSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';

export interface CarouselItem {
  img: string;
}

export const HomePage = () => {
  const { loading, phones } = useContext(ProductContext);

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

            <ProductsSlider title={'Brand new models'} products={phones} />
            <ShopByCategory />
            <ProductsSlider title={'Hot Prices'} products={phones} />
          </div>
        </>
      )}
    </div>
  );
};
