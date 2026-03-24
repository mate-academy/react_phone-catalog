import { usePhones } from '@/hooks/usePhones';
import { Categories } from '@/organisms/Categories';
import GoodList from '@/organisms/GoodList';
import Slider from '@/organisms/Slider';

const Home = () => {
  const phones = usePhones();
  const hotPrices = usePhones();

  return (
    <div>
      <Slider title="Welcome to Nice Gadgets store!" />
      <GoodList items={phones} title="Brand new models" />
      <Categories title="Shop by category" />
      <GoodList items={hotPrices} title="Hot prices" />
    </div>
  );
};

export default Home;
