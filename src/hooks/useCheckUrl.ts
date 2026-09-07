import { useLocation, useParams } from 'react-router-dom';

const useCheckUrl = () => {
  const location = useLocation();
  const { type } = useParams();

  const validTypes = ['phones', 'tablets', 'accessories'];

  const isCartPage = location.pathname === '/cart';
  const isFavouritesPage = location.pathname === '/favourites';
  const isValidType = type ? validTypes.includes(type) : false;

  return { isCartPage, isFavouritesPage, isValidType, type };
};

export default useCheckUrl;
