import { useContext } from 'react';
import { DataContext } from '../../context/ContextProvider';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import scss from './HomePage.module.scss';
import { Loader } from '../shared/components/Loader';
import { Categories } from './components/Categories';

export const HomePage: React.FC = () => {
  const { isLoading } = useContext(DataContext);

  return (
    <div className={scss.home}>
      <h1>Welcome to Nice Gadgets store!</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PicturesSlider />
          <ProductsSlider />
        </>
      )}
      <Categories />
    </div>
  );
};
