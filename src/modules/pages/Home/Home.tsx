import './Home.scss';
import { HotPrices } from './components/HotPrices';
import { NewPhones } from './components/NewPhones';
import { ShopCategories } from './components/ShopCategories';
import { Welcome } from './components/Welcome/Welcome';

export const Home: React.FC = () => {
  return (
    <div className="layout">
      <Welcome />
      <NewPhones />
      <ShopCategories />
      <HotPrices />
    </div>
  );
};
