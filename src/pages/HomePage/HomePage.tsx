import React from 'react';
import { Slider } from '../../components/swiper/swiper';
import { NewModels } from '../../components/NewModels/NewModels';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import '../../styles/containers.scss';
import './HomePage.scss';
import { Title } from '../../types/Titel';
export const HomePapge: React.FC = () => {
  return (
    <>
      <h2 className="title offCalss">Home page</h2>
      <div className="App">
        <div className="container margen-titel">
          <h1 className="offCalss">Product Catalog</h1>
          <h2 className="titel">Welcome to Nice Gadgets store!</h2>
        </div>
        <section className="section">
          <div className="container">
            <Slider />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <NewModels titel={Title.NewModels} />
            {/* componet \Brand new models\ */}
          </div>
        </section>
        <section className="section">
          <div className="container">
            <ShopByCategory />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <NewModels titel={Title.HotPrices} />
          </div>
        </section>
      </div>
    </>
  );
};
