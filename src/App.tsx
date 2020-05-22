import React, { useEffect, useState } from 'react';

import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getPhones, getPhoneById } from './helpers/getPhones';

export const App = () => {
  const [phonesProduct, setPhonesProduct] = useState<PhoneCatalog[]>([]);
  const [phonesDetails, setPhonesDetails] = useState<PhoneDetail[]>([]);
  const [loadError, setLoadError] = useState(false);

  console.log(phonesProduct);
  console.log(phonesDetails);
  console.log(loadError);

  useEffect(() => {
    getPhones()
      .then(phones => {
        setPhonesProduct(phones);
        return getPhoneById(phones);
      })
      .then(details => setPhonesDetails(details))
      .catch(() => setLoadError(true));
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <section className="section">
          <h1>Main Page</h1>
        </section>
      </div>
      <Footer />
    </>
  );
};
