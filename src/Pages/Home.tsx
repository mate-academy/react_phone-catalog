import { NewModels } from '../Components/NewModels';
import { HotPrices } from '../Components/HotPrices';
import { Categories } from '../Components/Categories';
import { BannerSlider } from '../Components/BannerSlider';
import { Phone } from '../Type/Phone';
import { Navigation } from '../Components/Navigation';

type Props = {
  phones: Phone[],
};

export const HomePage: React.FC<Props> = ({ phones }) => {
  return (
    <>
      <Navigation />

      <main>
        <BannerSlider />

        <div className="container--hot">
          <div className="hot__prices">
            <HotPrices phones={phones} />
          </div>
        </div>

        <Categories phones={phones} />

        <NewModels phones={phones} />
      </main>
    </>
  );
};
