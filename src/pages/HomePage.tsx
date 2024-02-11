import { Category } from '../component/Category';
import { Footer } from '../component/Footer';
import { Header } from '../component/Header';
import { HotPrise } from '../component/HotPrise';
import { NewPhones } from '../component/NewPhones';

export const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <HotPrise />
      <Category />
      <NewPhones />
      <Footer />
    </div>
  );
};
