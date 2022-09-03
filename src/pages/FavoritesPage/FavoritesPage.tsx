import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.scss';
import { Product } from '../../react-app-env';
import { getProducts } from '../../api/api';
import { Header } from '../../components/Header/Header';
import { ProductsList } from '../../components/Main/ProductsList/ProductsList';
import { Footer } from '../../components/Footer/Footer';
import { getFavoritesSelector } from '../../store/selectors';

export const FavoritesPage = () => {
  const fovorites = useSelector(getFavoritesSelector);

  const [errorMsg, setErrorMsg] = useState('');
  const [
    currentListForRender,
    setCurrentListForRender,
  ] = useState<Product[]>([]);
  const itemsPerPage = '8';

  const favorProducts = currentListForRender
    .filter(item => fovorites.includes(item.id));

  useEffect(() => {
    getProducts()
      .then(result => {
        setCurrentListForRender(result);
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div className="favoritespage">
      <Header />
      <div className="favoritespage__container">
        <div className="favoritespage__boximghomearrow">
          <IconButton
            color="inherit"
            sx={{
              padding: '0',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            <div
              className="favoritespage__imghome"
            />
          </IconButton>

          <div className="favoritespage__arrow" />
          <div className="favoritespage__namepage">Favorites</div>
        </div>
        <h1 className="favoritespage__title">Favorites</h1>
        <p className="favoritespage__countmodels">
          { favorProducts.length }
          {' '}
          models
        </p>
      </div>
      {errorMsg.length !== 0
      && <p className="favoritespage__error">{errorMsg}</p>}
      {favorProducts.length === 0
      && <p className="favoritespage__remainder">Favorites Page is empty!</p>}
      <div className="favoritespage__boxcards">
        <ProductsList
          currentListForRender={favorProducts}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <Footer />
    </div>
  );
};
