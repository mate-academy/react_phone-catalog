import ProductCard from '../_shared/productCard/ProductCard';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { HomePageStyled, TitleStyled } from './styled';

export const HomePage = () => {
  return (
    <HomePageStyled>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <TitleStyled>Welcome to Nice Gadgets store!</TitleStyled>
      <PicturesSlider />
      <ProductCard variant="HomePage" />
    </HomePageStyled>
  );
};
