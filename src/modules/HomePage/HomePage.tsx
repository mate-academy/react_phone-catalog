import { useContext } from 'react';
import '../shared/styles/_base.scss';
import { DataContext } from '../../context/ContextProvider';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import scss from './HomePage.module.scss';
import { Loader } from '../shared/components/Loader';
import { Categories } from './components/Categories';
import { SLIDER_TYPE } from '../../api/types';

export const HomePage: React.FC = () => {
  const { isLoading } = useContext(DataContext);

  return (
    <div className={scss.home}>
      <h2 className={scss.home__title}>Welcome to Nice Gadgets store!</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PicturesSlider />
          <ProductsSlider title={'Brand new models'} type={SLIDER_TYPE.NEW} />
          <Categories />
          <ProductsSlider title={'Hot prices'} type={SLIDER_TYPE.HOT} />
        </>
      )}
    </div>
  );
};
