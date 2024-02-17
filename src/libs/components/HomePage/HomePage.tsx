import { Banner } from '../Banner';
import { ShopByCategory } from '../ShopByCategory';
import { ProductsSlider } from '../SectionWithCards';
// import { useAppSelector } from '../../app/hooks';

export const HomePage = () => {
  // const { items: products } = useAppSelector(store => store.products);

  return (
    <>
      <Banner />
      <ProductsSlider
        title="Hot prices"
        classNames="main__hot-prices"
        hasSectionButtons
      />
      <ShopByCategory />
      <ProductsSlider
        title="Brand new models"
        classNames="main__brand-new-models"
        hasSectionButtons
      />
    </>
  );
};
