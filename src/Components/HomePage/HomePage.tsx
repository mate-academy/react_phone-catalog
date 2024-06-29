import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import './HomePage.scss';
import { Loader } from '../Loader';
import { PictureSlider } from '../PicturesSlider/PictureSlider';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory';

export const HomePage = () => {
  const { loading, phones } = useContext(ProductContext);

  return (
    <div className="home__page container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="home__page__wrapper">
            <h1 className="main-title">Welcome to Nice Gadgets store!</h1>
            <PictureSlider />

            <ProductsSlider title={'Brand new models'} products={phones} />
            <ShopByCategory />
            <ProductsSlider title={'Hot Prices'} products={phones} />
          </div>
        </>
      )}
    </div>
  );
};
