import { ShowOldPriceContext } from '../../context/OldPrice';
import { Categories } from '../Categories';
import { HotPrices } from '../HotPrices';
import { NewModels } from '../NewModels';
import { Welcome } from '../Welcome';

export const HomePage = () => {
  return (
    <>
      <Welcome />
      <ShowOldPriceContext.Provider value={false}>
        <NewModels />
      </ShowOldPriceContext.Provider>
      <Categories />
      <ShowOldPriceContext.Provider value={true}>
        <HotPrices />
      </ShowOldPriceContext.Provider>
    </>
  );
};
