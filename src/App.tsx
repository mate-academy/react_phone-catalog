import { Header } from './components/Header/Header.component';
import { HomePage } from './pages/Home/Home.page';

export const App = () => (
  <div className="App" id="top">
    {/* <h1>Product Catalog</h1> */}
    <Header />

    <HomePage />
  </div>
);
