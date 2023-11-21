import { Phone } from '../../types/Phone';

import '../../style/main.scss';
import './Home.scss';
import { Navigation } from '../../components/Navigation/Navigation';
import { Loader } from '../../components/Loader/Loader';
import { Slider } from '../../components/Slider/Slider';
import { HotPrice } from '../../components/HotPrice/HotPrice';
import { Category } from '../../components/Category/Category';
import { NewModels } from '../../components/NewModels/NewModels';

type Props = {
  phones: Phone[];
  isLoading: boolean;
};

export const HomePage: React.FC<Props> = ({ phones, isLoading }) => {
  return (
    <>
      <Navigation />

      <main>
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <Slider />
            <HotPrice phones={phones} />
            <Category phones={phones} />
            <NewModels phones={phones} />
          </>
        )}
      </main>
    </>
  );
};
