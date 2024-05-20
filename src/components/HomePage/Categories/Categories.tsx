import React from 'react';
import ImgLoader from 'src/components/ImgLoader/ImgLoader';
import './CategoriesStyle.scss';

const categories = () => {
  return (
    <div className="home__categories container">
      <h2 className="home__categoreis--title">Shop by category</h2>
      <div className="home__categories--wrapper">
        <div className="home__categories--sections categories">
          <div className="categories__section ">
            <div className="categories__image background-phones">
              <ImgLoader
                originalImage="img/category-phones.webp"
                secondImage="img/category-phones.png"
                name="categories__image--phones"
              />
            </div>
            <div className="categories__text">
              <h4 className="categories__text--title">Mobile phones</h4>
              <div className="categories__text--sub-title">95 models</div>
            </div>
          </div>
        </div>
        <div className="home__categories--sections categories">
          <div className="categories__section">
            <div className="categories__image background-tablets">
              <ImgLoader
                originalImage="img/category-tablets.webp"
                secondImage="img/category-tablets.png"
                name="categories__image--tablets"
              />
            </div>
            <div className="categories__text">
              <h4 className="categories__text--title"> Tablets</h4>
              <div className="categories__text--sub-title">24 models</div>
            </div>
          </div>
        </div>
        <div className="home__categories--sections categories">
          <div className="categories__section">
            <div className="categories__image background-accessories">
              <ImgLoader
                originalImage="img/category-accessories.webp"
                secondImage="img/category-accessories.png"
                name="categories__image--accessories"
              />
            </div>
            <div className="categories__text">
              <h4 className="categories__text--title">Accessories</h4>
              <div className="categories__text--sub-title"> 24 models</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default categories;
