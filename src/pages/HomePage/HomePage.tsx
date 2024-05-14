import './HomePage.scss';
import { Slider } from '../../components/Slider/Slider';
import { ProductContext, ProductProvider } from '../../store/ProductContext';
import { useContext } from 'react';
import { ProductSlider } from './components/ProductSlider/ProductSlider';

export const HomePage = () => {
  const products = useContext(ProductContext);

  return (
    <ProductProvider>
      <div>
        <section>
          <h1 className="title">Welcome to Nice Gadgets store!</h1>
          <Slider />
        </section>
        <ProductSlider products={products} step={1} />
        <div>end</div>
      </div>
    </ProductProvider>
  );
};
