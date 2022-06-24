import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LocalStorageContext } from '../../LocalStorageContext';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Address } from '../../components/Address';
import { FavoritesSlider } from '../../components/FavoritesSlider';

import './FavoritesPage.scss';

const favorites = () => {
  let keys = Object.keys(localStorage);

  keys = keys.filter((key) => key.includes('fav') === true);

  const itemsFromStorage = keys.map((key) => {
    const productKey = localStorage.getItem(key);

    if (productKey) {
      return JSON.parse(productKey);
    }

    return null;
  });

  return itemsFromStorage;
};

export const FavoritesPage = () => {
  const [favItems, setFavItems] = useState<Product[]>([]);
  const { storageItems } = useContext(LocalStorageContext);

  const searchData = useLocation().search.split('?query=')[1];
  let visibleProducts = [...favItems];

  if (searchData) {
    const searchInfo = searchData.toLowerCase();
    const searchProducts = favItems.filter((product) => {
      return product.id.replaceAll('-', '').includes(searchInfo);
    });

    visibleProducts = searchProducts;
  }

  useEffect(() => {
    setFavItems(favorites);
  }, [storageItems]);

  return (
    <>
      <div className="content">
        <Header />
        <div className="FavoritesPage wrapper">
          <div className="FavoritesPage__nav">
            <Address />
          </div>
          <h1 className="FavoritesPage__title">Favourites</h1>
          {favItems.length > 1 ? (
            <p className="FavoritesPage__count">{`${visibleProducts.length} items`}</p>
          ) : (
            <p className="FavoritesPage__count">{`${visibleProducts.length} item`}</p>
          )}
          <div className="FavoritesPage__list">
            <FavoritesSlider products={visibleProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
