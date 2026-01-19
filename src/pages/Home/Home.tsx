import { usePhones } from '@/hooks/usePhones';
import GoodList from '@/organisms/GoodList';
import Slider from '@/organisms/Slider';

const Home = () => {
  const phones = usePhones();

  return (
    <div>
      <Slider />
      <GoodList items={phones} />
    </div>
  );
};

export default Home;
