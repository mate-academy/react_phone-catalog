import { Banner } from '../../components/Banner/Banner';
import { Navbar } from '../../components/Navbar/Navbar';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <div className="home-page__banner">
          <Banner />
        </div>
      </main>
    </>
  );
};
