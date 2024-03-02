import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

export const HomePage = () => {
  return (
    <div className="container">
      <div className="banner">
        <img src="../_new/img/banner-phones.png" alt="" />
      </div>
      <ProductsSlider />
    </div>
  );
};
