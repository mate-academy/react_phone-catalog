import {
  Category,
  Navigation,
  NewModels,
  Slider,
  HotPrice,
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

        <HotPrice phones={phones} />

        <Category phones={phones} />

        <NewModels phones={phones} />
      </main>
    </>
  );
};
