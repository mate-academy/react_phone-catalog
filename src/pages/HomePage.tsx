import { Category } from '../components/Category';
import { HotPrice } from '../components/HotPrice';
import { NewModels } from '../components/NewModels';
import { Welcome } from '../components/Welcome';

export const HomePage = () => {
  return (
    <>
      <Welcome />
      <NewModels />
      <Category />
      <HotPrice />
    </>
  );
};
