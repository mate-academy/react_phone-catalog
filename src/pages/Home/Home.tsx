import { usePhones } from '@/hooks/usePhones';
import { Categories } from '@/organisms/Categories';
import GoodList from '@/organisms/GoodList';
import Slider from '@/organisms/Slider';

const Home = () => {
  const phones = usePhones();

  return (
    <div>
      <Slider />
      <GoodList items={phones} />
      <Categories />
    </div>
  );
};

export default Home;
