import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import './App.scss';
import { Bunner } from './components/Bunner';
import { HotPrices } from './components/HotPrices';
import { Categories } from './components/Categories';
import { NewModel } from './components/NewModel';

interface Phones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

const App = () => {
  const [getPhone, setGetPhone] = useState<Phones[] | undefined>();
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line max-len
  const url = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        setGetPhone(data);
      } catch (error) {
        setErrorMessage('Error during fetch:');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Bunner />
      {!errorMessage && (
        <HotPrices
          getPhone={getPhone}
        />
      )}
      <Categories />
      <NewModel
        getPhone={getPhone}
      />
      <Footer />
    </div>
  );
};

export default App;
