import { CategoryShop } from '../../components/CategoryShop/CategoryShop';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Slider } from '../../components/Slider';
import style from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={style.homePage}>
      <div className={style.header}>
        <h1 className={style.title}>Welcome to Nice Gadgets store!</h1>
        <Slider />
      </div>

      <div className={style.brandNewModels}>
        <ProductSlider
          title={'Brand new models'}
          discount={false}
          random={false}
        />
      </div>

      <div className={style.categoryShop}>
        <CategoryShop />
      </div>

      <div className={style.hotPrices}>
        <ProductSlider title={'Hot prices'} discount={true} random={false} />
      </div>
    </div>
  );
};
