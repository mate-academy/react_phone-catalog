import { Outlet } from 'react-router-dom';
import './App.scss';
import { useAppSelector } from './utils/store';

export const App = () => {
  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);
  const theme = useAppSelector(state => state.theme);

  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('favourites', JSON.stringify(favourites));
  localStorage.setItem('theme', theme);

  return (
    <div className="App">
      <Outlet></Outlet>
    </div>
  );
};
