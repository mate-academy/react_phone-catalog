import { Header } from '../Header/Header';
import { Category } from '../Category/Category';
import './Homepage.scss';
import { useContext } from 'react';
import { ProductContext } from '../utils/contexts';
import { RecommendedSlider } from '../RecommendedSlider/RecommendedSlider';

export const Homepage = () => {
  const phones = useContext(ProductContext)?.filter(
    product => product.category === 'phones',
  );

  const newModels =
    phones?.filter(phone => phone.name.includes('iPhone 14')) || [];

  return (
    <>
      <Header />
      <div className="container">
        <div className="page__new-models-top">
          <RecommendedSlider
            title="Brand new models"
            recommendedProducts={newModels}
          />
        </div>

        <h2 className="page__title">Shop by category</h2>
        <div className="page__category__container">
          <div className="page__category">
            <Category
              img="./img/other/phones-category.png"
              title="Phones"
              amount={95}
            />
          </div>
          <div className="page__category">
            <Category
              img="./img/other/tablets-category.png"
              title="Tablets"
              amount={95}
            />
          </div>
          <div className="page__category">
            <Category
              img="./img/other/accessories-category.png"
              title="Accessories"
              amount={95}
            />
          </div>
        </div>
      </div>
    </>
  );
};
