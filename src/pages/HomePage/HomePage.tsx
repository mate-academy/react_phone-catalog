import { createContext } from 'react';
import { Photos } from '../../components/Photos';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Categories } from '../../components/Catagories';
import { NewBrands } from '../../components/NewBrands';

const ReductionContext = createContext(false);

export const HomePage = () => {
  return (
    <main className="home page__main-container">
      <Photos />

      <ReductionContext.Provider value>
        <ProductsSlider />
      </ReductionContext.Provider>

      <Categories />

      <ReductionContext.Provider value>
        <NewBrands />
      </ReductionContext.Provider>
    </main>
  );
};
