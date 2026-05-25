import { Footer } from '../shared/components/Layout/Footer';
import { Header } from '../shared/components/Layout/Header';

export const HomePage = () => {
  return (
    <div className="section">
      <Header />
      <h1 className="title">Product Catalog</h1>
      <Footer />
    </div>
  );
};
