import './App.modules.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { PhoneCatalog } from './modules/PhonesPage/components/PhonesCatalog';

export const App = () => {
  return (
    <>
      <Header />
      <PhoneCatalog />
      <Footer />
    </>
  );
};
