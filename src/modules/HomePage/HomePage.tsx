import { StrCode } from '../../utils/enums';
import ProductCard from '../_shared/productCard/ProductCard';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { HomePageStyled, TitleStyled } from './styled';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <HomePageStyled>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>
      <TitleStyled>{t(StrCode.WelcomeMessage)}</TitleStyled>
      <PicturesSlider />
      <ProductCard variant="HomePage" />
    </HomePageStyled>
  );
};
