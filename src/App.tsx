import { Header } from '@Header';
import { HomePage } from '@HomePage';
import { Footer } from '@GlobalComponents';

import './assets/styles/main.scss';
// import { PhonePage } from './modules/PhonesPage/PhonesPage';

export const App = () => {
  return (
    <>
      <Header />
      <HomePage />
      {/* <PhonePage /> */}
      <Footer />
    </>
  );
};
