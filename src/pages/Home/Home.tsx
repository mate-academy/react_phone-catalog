import { Page } from '@/atoms';
import { usePhones } from '@/hooks/usePhones';
import { ShortList } from '@/molecules';
import { Categories, Slider } from '@/organisms';

const Home = () => {
  const phones = usePhones();
  const hotPrices = usePhones();

  return (
    <Page>
      <Slider title="Welcome to Nice Gadgets store!" />
      <ShortList items={phones} title="Brand new models" />
      <Categories title="Shop by category" />
      <ShortList items={hotPrices} title="Hot prices" discount={true} />
    </Page>
  );
};

export default Home;
