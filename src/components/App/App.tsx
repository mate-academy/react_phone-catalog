import './App.scss';

import { Header } from '../Header/Header';
import { ProductSlider } from '../ProductSlider';

export const App = () => {
  return (
    <div className="app">
      <div className="page">
        <Header />
        <main className="main">
          <ProductSlider />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
