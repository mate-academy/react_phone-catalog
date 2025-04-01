import { useProduct } from '../../store/ProductContext';
import { SliderSection } from '../shared/components/SliderSection';
import { Categories } from './components/Categories/Categories';
import { HomeSlider } from './components/HomeSlider';
export const HomePage = () => {
  const { products } = useProduct();

  const newestYear = Math.max(...products.map(product => product.year));

  const newProducts = [...products].filter(
    product => product.year === newestYear,
  );

  const hotPriceProducts = [...products]
    .filter(a => a.fullPrice > a.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <>
      <section className="App__section" id="home">
        {/* eslint-disable-next-line max-len */}
        <div className="App__section-content App__section-content App__section-content--hs">
          <HomeSlider
            prevClass={'home__prev'}
            nextClass={'home__next'}
            paginationClass={'home__pagination'}
          />
        </div>
      </section>
      <section className="App__section" id="nm">
        <div className="App__section-content App__section-content--nm">
          <SliderSection
            products={newProducts}
            prevClass={'nm__prev'}
            nextClass={'nm__next'}
            title={'New Models'}
          />
        </div>
      </section>
      <section className="App__section" id="categories">
        <div className="App__section-content">
          <Categories />
        </div>
      </section>
      <section className="App__section" id="nm">
        <div className="App__section-content App__section-content--hot">
          <SliderSection
            products={hotPriceProducts}
            prevClass={'hot__prev'}
            nextClass={'hot__next'}
            title={'Hot prices'}
          />
        </div>
      </section>
    </>
  );
};
