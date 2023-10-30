/* eslint-disable object-curly-newline */
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

const images = [
  { image: 1, text: 'Mobile phones', found: '16 models', link: 'phones' },
  { image: 2, text: 'Tablets', found: '4 models', link: 'tablets' },
  { image: 3, text: 'Accessories', found: '0 models', link: 'accessories' },

];

export const ShopByCategory = () => {
  return (
    <div className="ShopByCategory">
      <h1 className="ShopByCategory__title">
        Shop by category
      </h1>
      <div className="ShopByCategory__cards">
        {
          images.map(el => {
            return (
              <Link
                to={`/${el.link}`}
                className="ShopByCategory__card"
                key={el.text}
              >
                <div className="ShopByCategory__image-wrapper">
                  <img
                    src={`./imagesHome/${el.image}.jpg`}
                    alt="category"
                    className="ShopByCategory__img"
                  />
                </div>
                <h3 className="ShopByCategory__header">
                  {el.text}
                </h3>
                <h3 className="ShopByCategory__numberOfProducts">
                  {el.found}
                </h3>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
};
