import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider';
import { ShopByCategory } from '../components/ShopByCategory';
import { Slider } from '../components/Slider';
import { ProductsCardType } from '../types/ProductsCardType';
import { useAppSelector } from '../utils/hooks/hooks';

export const HomePage = () => {
  const { isLoading, hasError } = useAppSelector(state => state.products);

  if (hasError) {
    return <h1>Can&#x0374;t load products</h1>;
  }

  return (
    <div className="container">
      <section className="section">
        <Slider />
      </section>

      {isLoading
        ? <Loader />
        : (
          <>
            <ProductsSlider type={ProductsCardType.DISCOUNT} />
            <ShopByCategory />
            <ProductsSlider type={ProductsCardType.NEWBRANDS} />
          </>
        )}
    </div>
  );
};
