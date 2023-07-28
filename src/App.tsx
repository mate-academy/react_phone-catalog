import { FC, useState, useEffect } from 'react';

import './App.scss';

import { Header } from './pages/components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { Footer } from './pages/components/Footer';
import { getPhones } from './api/phone';
import { Phone } from './types/Phone';
// import { ProductDetailsPage } from './pages/ProductDetailsPage';

const App: FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  async function loadedPhones() {
    try {
      const result = await getPhones();

      setPhones(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  useEffect(() => {
    loadedPhones();
  }, []);

  return (
    <div className="App">
      <Header />
      <HomePage phones={phones} />
      <PhonesPage phones={phones} />
      {/* <ProductDetailsPage /> */}
      <Footer />
    </div>
  );
};

export default App;
