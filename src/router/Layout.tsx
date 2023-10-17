import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

export const Layout = () => (
  <>
    <header className="header"><Navbar /></header>
    <main className="main"><Outlet /></main>
    <footer className="footer"><Footer /></footer>
  </>
);
