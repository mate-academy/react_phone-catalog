import { HeroSection } from './components/HeroSection';
import { Category } from './components/Category/Category';

import { HotPrice } from './components/HotPrice/HotPrice';
import { NewModels } from './components/NewModels/NewModels';

export const HomePage = () => {
  return (
    <>
      <main className="main">
        <HeroSection />
        <NewModels />
        <Category />
        <HotPrice />
      </main>
    </>
  );
};
