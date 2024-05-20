import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { TitleStyled } from './styled';

export const HomePage = () => {
  return (
    <div>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <TitleStyled>Welcome to Nice Gadgets store!</TitleStyled>
      <PicturesSlider />
    </div>
  );
};
