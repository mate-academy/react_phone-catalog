import { NewModels } from '../Components/NewModels';
import { HotPrices } from '../Components/HotPrices';
import { Categories } from '../Components/Categories';
import { BannerSlider } from '../Components/BannerSlider';
import { Phone } from '../Type/Phone';

type Props = {
  phones: Phone[],
};

export const HomePage: React.FC<Props> = ({ phones }) => {
  return (
    <main>

      <BannerSlider />

      <HotPrices phones={phones} />

      <Categories phones={phones} />

      <NewModels phones={phones} />

    </main>
  );
};
