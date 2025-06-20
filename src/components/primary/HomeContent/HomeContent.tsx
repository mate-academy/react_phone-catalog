import { Category } from '../../secondary/HomePageComponents/category';
import { HotPrice } from '../../secondary/HomePageComponents/HotPrice';
import { Header } from '../../secondary/HomePageComponents/Header';
import { Brand } from '../../secondary/HomePageComponents/Brand';

export const HomeContent = () => {
  return (
    <>
      <Header />
      <Brand />
      <Category />
      <HotPrice />
    </>
  );
};
