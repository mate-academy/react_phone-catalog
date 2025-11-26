import React from 'react';
import Header from '../shared/components/Header/Header';
import Footer from '../shared/components/Footer/Footer';
import ProductsSlider from './components/ProductSlider/ProductSlider';
import PictureSlider from './components/PictureSlider/PictureSlider';
import ShopByCategory from './components/ShopByCategory/ShopByCategory';
import ProductsSliderNew from './components/ProductSliderNew/ProductSliderNew';
import FloatingButtons from '../shared/components/FloatingButtons/FloatingButtons';
import YouMayAlsoLike from '../ProductsPage/components/ProductDetailsPage/components/YouMayAlsoLike/YouMayAlsoLike';



const HomePage: React.FC = () => {
  return (
    <div>
      
      <Header />

      <h1 className="visually-hidden">Welcome to Nice Gadgets store!</h1>

      <PictureSlider />

      <ProductsSliderNew />

      <ShopByCategory />

      <ProductsSlider />

      

      <Footer />
    </div>
  );
};

export default HomePage;
