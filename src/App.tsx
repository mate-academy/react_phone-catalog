import { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/Home/Home.page';
import { DispatchContext } from './store/GlobalStateProvider';
import { getProducts } from './api/products';
import { AccessorySpecs } from './types/AccessorySpecs';
import { PhoneSpecs } from './types/PhoneSpecs';
import { TabletSpecs } from './types/TabletSpecs';
import { ProductSummary } from './types/ProductSummary';

export const App = () => {
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    getProducts<AccessorySpecs[]>(
      'http://localhost:3000/api/accessories.json',
    ).then(accessoriesFromServer => {
      dispatch({ type: 'loadAccessories', payload: accessoriesFromServer });
    });
  }, [dispatch]);

  useEffect(() => {
    getProducts<PhoneSpecs[]>('http://localhost:3000/api/phones.json').then(
      phonesFromServer => {
        dispatch({ type: 'loadPhones', payload: phonesFromServer });
      },
    );
  }, [dispatch]);

  useEffect(() => {
    getProducts<TabletSpecs[]>('http://localhost:3000/api/tablets.json').then(
      tabletsFromServer => {
        dispatch({ type: 'loadTablets', payload: tabletsFromServer });
      },
    );
  }, [dispatch]);

  useEffect(() => {
    getProducts<ProductSummary[]>(
      'http://localhost:3000/api/products.json',
    ).then(productsFromServer => {
      dispatch({ type: 'loadProducts', payload: productsFromServer });
    });
  }, [dispatch]);

  return (
    <div className="App" id="top">
      {/* <h1>Product Catalog</h1> */}
      <Header />

      <HomePage />
    </div>
  );
};
