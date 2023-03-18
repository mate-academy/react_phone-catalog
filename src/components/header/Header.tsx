import { useContext, useEffect } from 'react';
import './header.scss';
import { Navigation } from '../navigation/Navigation';
import { GlobalContext } from '../../reducer';

export const Header = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then(res => res.json())
      .then(res => dispatch({ type: 'addCatalog', list: res }));
  }, []);

  return (
    <header className="header">
      <div className="logo" />
      <Navigation favorite={10} shoping={6} />
    </header>
  );
};
