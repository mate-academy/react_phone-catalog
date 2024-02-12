import { Slider } from '../Banner';
import { ShopByCategory } from '../ShopByCategory';
import { SectionWithCards } from '../SectionWithCards';

export const HomePage = () => {
  return (
    <>
      <Slider />
      <SectionWithCards
        title="Hot prices"
        classNames="main__hot-prices"
        hasSectionButtons
      />
      <ShopByCategory />
      <SectionWithCards
        title="Brand new models"
        classNames="main__brand-new-models"
        hasSectionButtons
      />
    </>
  );
};
