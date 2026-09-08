import { Slider } from '../../components/Slider';
import { BrandNewModel } from '../../sections/BrandNew';
import { HotPrices } from '../../sections/HotPrices';
import { ShopByCategory } from '../../sections/ShopByCategory';

export const HomePage = () => {
  return (
    <div className="box-border">
      <div className="grids">
        <h1 className="invisible hidden">Product Catalog</h1>

        <h1 className="welcome-title col-[1/5] sm:col-[1/10] xl:col-[1/18]">
          Welcome to Nice Gadgets store!
        </h1>
      </div>

      <div className="grids">
        <Slider />
      </div>

      <div className="grids mr-0 xl:mr-[32px]">
        <BrandNewModel />
      </div>

      <div className="grids">
        <ShopByCategory />
      </div>

      <div className="grids mr-0 xl:mr-[32px]">
        <HotPrices />
      </div>
    </div>
  );
};
