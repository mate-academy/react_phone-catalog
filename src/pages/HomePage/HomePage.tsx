import './HomePage.scss';

import { HotPhones } from '../../components/HotPhones/HotPhones';
import { TopSlider } from '../../components/TopSlider/TopSlider';
import { Phone } from '../../types/Phone';
import { Category } from '../../components/Category/Category';
import { NewModels } from '../../components/NewModels/NewModels';

type Props = {
  phones: Phone[],
};

export const HomePage: React.FC<Props> = ({ phones }) => {
  return (
    <>
      <div className="home-page">
        <TopSlider />

        <HotPhones
          phones={phones}
        />

        <Category />

        <NewModels
          phones={phones}
        />
      </div>
    </>
  );
};
