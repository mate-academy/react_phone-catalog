import { useContext } from 'react';
import { DataContext } from '../../context/ContextProvider';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import scss from './HomePage.module.scss';
import { Loader } from '../shared/components/Loader/Loader';

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
    </div>
  );
};
