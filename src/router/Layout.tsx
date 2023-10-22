import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { NavbarContextProvider } from '../context/NavbarContext';

export const Layout = () => {
  return (
    <NavbarContextProvider>
      <header className="header"><Navbar /></header>
      <main className="main"><Outlet /></main>
      <footer className="footer"><Footer /></footer>
    </NavbarContextProvider>
  );
};
