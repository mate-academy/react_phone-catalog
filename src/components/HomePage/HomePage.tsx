import { NewModels } from '../New-models/New-models';
import { Slider } from '../Slider/Slider';
import './HomePage.scss';

export const HomePage = () => (
  <main className="home-page">
    <div className="container">
      <section className="section section__main" id="main">
        <h2 style={{ color: 'red' }}>This site has not finished yet!!!</h2>
        <h1 className="section__title section__title--main">
          Welcome to Nice Gadgets store!
        </h1>
        <Slider />
      </section>
      <section className="section section__new-models" id="new-models">
        <NewModels />
      </section>
      <section className="section section__categories" id="categories">
        <h2 className="section__title">Shop by category</h2>
      </section>
      <section className="section section__hot-prices" id="hot-prices">
        <h2 className="section__title">Hot prices</h2>
      </section>
    </div>
  </main>
);
