import { Home } from './home/Home';
import { NewModels } from './newModels/NewModels';
import { Category } from './Category/Category';
import { HotPrices } from './HotPrices/HotPrices';
import { Phone } from '../../../src/types/Phone';

type Props = {
  devices: Phone[];
};

export const HomePage: React.FC<Props> = ({ devices }) => {
  return (
    <>
      <Home />
      <NewModels devices={devices} />
      <Category />
      <HotPrices devices={devices} />
    </>
  );
};
