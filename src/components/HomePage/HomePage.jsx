/* eslint-disable react/jsx-filename-extension */
import { CorpoDaPagina } from '../CorpoDaPaginaSuperior/CorpoDaPagina';
import { Carrossel } from '../Carrossel/Carrossel';
// eslint-disable-next-line max-len
import { PlaceBrandNewModels } from '../PlaceBrandNewModels/PlaceBrandNewModels';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { HotPrices } from '../HotPrices/HotPrices';
import { Footer } from '../Footer/Footer';

export const HomePage = () => (
  <>
    <CorpoDaPagina />
    <Carrossel />
    <PlaceBrandNewModels />
    <ShopByCategory />
    <HotPrices />
    <Footer />
  </>
);
