import React from 'react';


// import PhonesPage from './modules/PhonesPage/PhonesPage';
// import ProductsPage from './modules/ProductsPage/ProductsPage';
// import AccessoriesPage from './modules/AccessoriesPage/AccessoriesPage';
// import TabletsPage from './modules/TabletsPage/TabletsPage';
// import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { ProductsSlider } from './ProductsSlider/ProductsSlider';

export const HomePage: React.FC = () => {
    return (


        <main className='main'>
          <h1 className='main__title'>Welcome to Nice Gadgets store!</h1>

          <PicturesSlider />

          <ProductsSlider />

          {/* <section className='section section--brand-new'>
            <h2 className='section__title'>Brand new models</h2>
            <div className='product-grid'>
              <div className='product-card'>
                <img src={iPhone} alt="iPhone" className='product-card__image' />
                <h3 className='product-card__title'>Apple iPhone 14 Pro 128GB Silver (MQ023)</h3>
                <p className='product-card__price'>$999</p>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen</span>
                    <span className='product-card__value'>6.1”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity</span>
                    <span className='product-card__value'>128 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM</span>
                    <span className='product-card__value'>6 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>

              <div className='product-card'>
                <img src={iPhoneSecond} alt="iPhone" className='product-card__image' />
                <h3 className='product-card__title'>Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)</h3>
                <p className='product-card__price'>$999</p>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen:</span>
                    <span className='product-card__value'>6.1”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity</span>
                    <span className='product-card__value'>128 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM</span>
                    <span className='product-card__value'>6 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>
              <div className='product-card'>
                <img src={iPhoneThird} alt="iPhone" className='product-card__image' />
                <h3 className='product-card__title'>Apple iPhone 14 Plus 128GB PRODUCT GOLD (MQ513)</h3>
                <p className='product-card__price'>$999</p>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen:</span>
                    <span className='product-card__value'>6.7”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity:</span>
                    <span className='product-card__value'>128 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM:</span>
                    <span className='product-card__value'>6 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>
              <div className='product-card'>
                <img src={iPhoneFourth} alt="iPhone" className='product-card__image' />
                <h3 className='product-card__title'>Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)</h3>
                <p className='product-card__price'>$859</p>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen:</span>
                    <span className='product-card__value'>6.7”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity:</span>
                    <span className='product-card__value'>128 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM:</span>
                    <span className='product-card__value'>6 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>
            </div>
          </section> */}

          {/* <section className='section'>
            <h2 className='section__title'>Shop by category</h2>
            <div className='categories'>
              <div className='category category--mobiles'>
                <img src={categoryFirst} alt="Phones" className='category__image' />
                <h3 className='category__title'>Mobile phones</h3>
                <p className='category__count'>95 models</p>
              </div>
              <div className='category category--tablets'>
                <img src={categorySecond} alt="Tablets" className='category__image' />
                <h1 className='category__title'>Tablets</h1>
                <p className='category__count'>95 models</p>
              </div>
              <div className='category category--accessories'>
                <img src={categoryThird} alt="Accessories" className='category__image' />
                <h1 className='category__title'>Accessories</h1>
                <p className='category__count'>95 models</p>
              </div>
            </div>
          </section> */}

          {/* <section className='section section--hot-prices'>
            <div className='section__header'>
              <h1 className='section__title'>Hot prices</h1>
              <a href="#"><img src={strokeLeft} alt="Previous" ></img></a>
              <a href="#"><img src={strokeRight} alt="Next"></img></a>
            </div>

            <div className='product-grid'>
              <div className='product-card'>
                <img src={hotPriceFirst} alt="" className='product-card__image' />
                <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
                <div className='product-card__price'>
                  <p className='product-card__price-value product-card__price-value--new'>$799</p>
                  <p className='product-card__price-value product-card__price-value--old'>$999</p>
                </div>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen</span>
                    <span className='product-card__value'>6.1”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity</span>
                    <span className='product-card__value'>64 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM</span>
                    <span className='product-card__value'>4 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>

              <div className='product-card'>
                <img src={hotPriceSecond} alt="" className='product-card__image' />
                <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
                <div className='product-card__price'>
                  <p className='product-card__price-value product-card__price-value--new'>$799</p>
                  <p className='product-card__price-value product-card__price-value--old'>$999</p>
                </div>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen</span>
                    <span className='product-card__value'>6.5”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity</span>
                    <span className='product-card__value'>64 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM</span>
                    <span className='product-card__value'>4 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>

              <div className='product-card'>
                <img src={hotPriceThird} alt="" className='product-card__image' />
                <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
                <div className='product-card__price'>
                  <p className='product-card__price-value product-card__price-value--new'>$799</p>
                  <p className='product-card__price-value product-card__price-value--old'>$999</p>
                </div>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen</span>
                    <span className='product-card__value'>6.5”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity</span>
                    <span className='product-card__value'>64 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM</span>
                    <span className='product-card__value'>4 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>

              <div className='product-card'>
                <img src={hotPriceFourth} alt="" className='product-card__image' />
                <p className='product-card__title'>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>
                <div className='product-card__price'>
                  <p className='product-card__price-value product-card__price-value--new'>$799</p>
                  <p className='product-card__price-value product-card__price-value--old'>$999</p>
                </div>
                <div className='product-card__specs'>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Screen</span>
                    <span className='product-card__value'>6.5”OLED</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>Capacity</span>
                    <span className='product-card__value'>64 GB</span>
                  </div>
                  <div className='product-card__details'>
                    <span className='product-card__property'>RAM</span>
                    <span className='product-card__value'>4 GB</span>
                  </div>
                </div>
                <div className='product-card__actions'>
                  <button className='product-card__button'>Add to cart</button>
                    <a href="#"><img src={favouritesIcon} alt="Favourites" className='product-card__icon'/></a>
                </div>
              </div>
            </div>
          </section> */}
        </main>

    );
  };


