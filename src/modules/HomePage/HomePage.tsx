import { useAppSelector } from '../../hooks/hookStore';
import { StrCode } from '../../utils/enums';
import CategoryBlock from './components/CategoryBlock/CategoryBlock';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import ProductsSlider from '../_shared/ProductsSlider/ProductsSlider';
import { HomePageStyled, TitleStyled } from './styled';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { t } = useTranslation();
  const { products = [] } = useAppSelector(state => state.products) || {};

  const newModelProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);
  const hotPriceProducts = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 15);

  return (
    <div>
      <h1 style={{ display: 'none' }}>Product Catalog</h1>

      <TitleStyled>{t(StrCode.WelcomeMessage)}</TitleStyled>
      <HomePageStyled>
        <PicturesSlider />

        <ProductsSlider
          name={t(StrCode.NewModels)}
          products={newModelProducts}
        />

        <CategoryBlock />

        <ProductsSlider
          name={t(StrCode.HotPrices)}
          products={hotPriceProducts}
        />
      </HomePageStyled>
    </div>
  );
};
