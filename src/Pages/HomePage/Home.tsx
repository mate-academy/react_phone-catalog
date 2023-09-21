import { NewModels } from './components/NewModels/NewModels';
import { HotPrices } from './components/HotPrices/HotPrices';
import { Category } from './components/Category/Category';
import { Slider } from './components/Slider/Slider';
import { Phone } from '../../Type/Phone';
import { Navigation } from '../../Components/Navigation';

import '../../style/main.scss';
import './home.scss';

type Props = {
  phones: Phone[],
};

export const HomePage: React.FC<Props> = ({ phones }) => {
  return (
    <>
      <Navigation />

      <main>
        <Slider />

        <HotPrices phones={phones} />

        <Category phones={phones} />

        <NewModels phones={phones} />
      </main>
    </>
  );
};
