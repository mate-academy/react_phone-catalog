import { ProductCard } from '../ProductCard';
import '../utils/main.scss';
import './HomePage.scss';

export const HomePage = () => {
  return (
    <>
      <div className="homePage">
        <h1 className="homePage_title">Welcome to Nice Gadgets store!</h1>
        <div className="homePage_pictureSlider">
          <div className="homePage_pictureSlider_container">
            {/* <img className="homePage_pictureSlider_image" src="img/banner.jpg" alt="banner" /> */}
          </div>
          <div className="homePage_pictureSlider_dots">
            <div className="homePage_pictureSlider_dot"></div>
            <div className="homePage_pictureSlider_dot"></div>
            <div className="homePage_pictureSlider_dot"></div>
          </div>
        </div>
        <div className="homePage_productsSlider">
          <div className="homePage_productsSlider_container-top">
            <h2 className="homePage_productsSlider_title">
              Brand new <br />
              models
            </h2>
            <div className="homePage_productsSlider_buttons">
              <div className="homePage_productsSlider_buttons_button">
                <img src="img/Vector_disabled.jpg" alt="sliderButton" />
              </div>
              <div className="homePage_productsSlider_buttons_button">
                <img src="img/Vector_active.jpg" alt="sliderButton" />
              </div>
            </div>
          </div>

          <div className="homePage_productsSlider_viewport">
            <ProductCard />
          </div>
        </div>

        <div className="homePage_shopByCategory"></div>
        <div className="homePage_hotPricesSlider"></div>
      </div>
    </>
  );
};
