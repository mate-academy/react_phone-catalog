import React from 'react';
import './Categories.scss';
import { useHistory } from 'react-router-dom';


const categories = [
  {
    name: 'Mobile phones',
    color: '#FCDBC1',
    imgUrl: './img/Categories/image1.svg',
    items: 0,
    url: 'phones',

  }, {
    name: 'Tablets',
    color: '#8D8D92',
    imgUrl: './img/Categories/image2.svg',
    items: 0,
    url: 'tablets',
  }, {
    name: 'Accessories',
    color: '#973D5F',
    imgUrl: './img/Categories/img3.png',
    items: 0,
    url: 'accessories',
  }];

export const Categories = () => {
  const history = useHistory();

  const handleRedirect = (url: string) => {
    history.push({
      pathname: url,
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="container__top">
          <h2 className="container__title">Shop by category</h2>
        </div>
        <div className="Categories">
          <ul className="Categories__container" role="article">
            {categories.map(category => (
              <li
                role="presentation"
                key={category.name}
                onClick={() => handleRedirect(category.url)}
                className="Categories__item"
              >
                <div
                  className="Categories__background"
                  style={{ backgroundColor: category.color }}
                >
                  <img
                    className="Categories__img"
                    src={category.imgUrl}
                    alt="img1"
                  />
                </div>
                <h3 className="Categories__title">{category.name}</h3>
                <p className="Categories__items">{`${category.items} models`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
