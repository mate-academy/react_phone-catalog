import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout = () => {
  console.log("Layout component rendered!");
  return (
    <div className="wrapper">
      <Header />
      <main className="main page__main">
        <Outlet />
      </main>
      <Footer />
    </div>
   
    
  );
};
