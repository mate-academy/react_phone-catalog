import { BrandNewModels } from '../BrandNewModels';
import { CategoryShop } from '../CategoryShop/CategoryShop';
import { HotPrices } from '../HotPrices';
import style from './Main.module.scss';

export const Main = () => (
  <main className={style.main}>
    <BrandNewModels />
    <CategoryShop />
    <HotPrices />
  </main>
);
