import { MainSlider } from '../components/MainSlider';
import { ProductSlider } from '../components/ProductSlider';
import { ShopByCategory } from '../components/CategoryList';
import { SliderTitles } from '../enum/SliderTitles';
import { useFetch } from '../hooks/useFetch';
import { Fetch } from '../enum/Fetch';

export const Home = () => {
  const [hotPhones, isLoadingHot, isErrorHot] = useFetch(Fetch.hotProducts);
  const [newPhones, isLoadingNew, isErrorNew] = useFetch(Fetch.newProducts);

  return (
    <div className="page__container page__container--home">
      <MainSlider />

      <ProductSlider
        title={SliderTitles.hot}
        phones={hotPhones}
        isError={isErrorHot}
        isLoading={isLoadingHot}
      />

      <ShopByCategory />

      <ProductSlider
        title={SliderTitles.new}
        phones={newPhones}
        isError={isErrorNew}
        isLoading={isLoadingNew}
      />
    </div>
  );
};
