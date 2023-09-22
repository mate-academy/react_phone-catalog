import {
  Category,
  Navigation,
  NewModels,
  Slider,
  SliderPhones,
} from '../../Components';
import { Phone } from '../../Type/Phone';

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

        <SliderPhones phones={phones} />

        <Category phones={phones} />

        <NewModels phones={phones} />
      </main>
    </>
  );
};
