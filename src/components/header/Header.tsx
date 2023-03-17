import './header.scss';
import { Navigation } from '../navigation/Navigation';

export const Header = () => {
  return (
    <header className="header">
      <div className="logo" />
      <Navigation favorite={10} shoping={6} />
    </header>
  );
};
