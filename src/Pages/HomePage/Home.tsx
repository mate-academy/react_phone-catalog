import {
  Category,
  Navigation,
  NewModels,
  Slider,
  HotPrice,
  Loader,
} from '../../Components';
import { Phone } from '../../Type/Phone';

import '../../style/main.scss';
import './home.scss';

type Props = {
  phones: Phone[],
  isLoading: boolean;
};

export const HomePage: React.FC<Props> = ({ phones, isLoading }) => {
  return (
    <>
      <Navigation />

      <main>
        {isLoading && (<Loader />)}

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
