import { useContext } from 'react';
import { PhoneSlider } from '../components/PhoneSlider';
import { Category } from './components/Category';
import { StateContext } from '../../Store';
import { HeaderSkelton } from './components/Header/HeaderSkeleton';
import { Header } from './components/Header';
import { SliderSkeleton } from '../components/PhoneSlider/SliderSkeleton';
import { CategorySkeleton } from './components/Category/CategorySkeleton';

export const HomePage = () => {
  const { brandNewModels, hotPrices, isLoading } = useContext(StateContext);

  return (
    <>
      {isLoading ? <HeaderSkelton /> : <Header />}

      {isLoading ? (
        <SliderSkeleton />
      ) : (
        <PhoneSlider blockName={'Brand new models'} models={brandNewModels} />
      )}

      {isLoading ? <CategorySkeleton /> : <Category />}

      {isLoading ? (
        <SliderSkeleton />
      ) : (
        <PhoneSlider blockName={'Hot prices'} models={hotPrices} discount />
      )}
    </>
  );
};
