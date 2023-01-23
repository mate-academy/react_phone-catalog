import classNames from 'classnames';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '../../components/Carousel';
import { Notification } from '../../components/Notification';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { PhoneContext } from '../../utils/PhoneContext';
import phoneList from '../../api/products.json';
import tabletList from '../../api/tablets.json';

enum Colors {
  One = '#ffe8f3',
  Two = '#89939A',
  Three = '#D53C51',
}

export const HomePage: React.FC = () => {
  const phones: Phone[] = phoneList;
  const tablets: Tablet[] = tabletList;

  const categoryes = [
    {
      id: 1,
      to: '/phones',
      color: Colors.One,
      width: '386px',
      imgSrc: '/_new/img/category-phones.png',
      name: 'Mobile phones',
      count: `${phones.length - 1} models`,
    },
    {
      id: 2,
      to: '/tablets',
      color: Colors.Two,
      width: '546px',
      imgSrc: '/_new/img/category-tablets.png',
      name: 'Tablets',
      count: `${
        tablets.filter(item => item.type === 'tablet').length - 1
      } models`,
    },
    {
      id: 3,
      to: '/accessories',
      color: Colors.Three,
      width: '872px',
      imgSrc: '/_new/img/category-accessories.png',
      name: 'Accessories',
      count: '0 models',
    },
  ];

  const [hoverId, setHoverId] = useState(0);
  const [newPhoneList, setNewPhoneList] = useState<Phone[]>([]);
  const [salePhoneList, setSalePhoneList] = useState<Phone[]>([]);
  const newTitle = 'Brand new models';
  const saleTitle = 'Hot prices';

  useEffect(() => {
    const visibleList = [...phones].sort((a, b) => (
      (a.price * 100) / a.fullPrice - (100 * b.price) / b.fullPrice
    ));

    setSalePhoneList(visibleList);
  }, []);

  useEffect(() => {
    const visibleList = [...phones].sort((a, b) => (
      b.year - a.year
    ));

    setNewPhoneList(visibleList);
  }, []);

  const { isAddCart, isAddFav } = useContext(PhoneContext);

  return (
    <div className="HomePage">
      {isAddCart && (
        <Notification title="Succes" text="Was added to shopping cart" />
      )}
      {isAddFav && (
        <Notification title="Succes" text="Was added to favorites" />
      )}
      <Carousel />

      <div className="hotPrices">
        <ProductsSlider
          phoneList={salePhoneList}
          title={saleTitle}
        />
      </div>

      <div
        className="HomePage_conteiner"
      >
        <h1 className="HomePage_conteiner_title">
          Shop by category
        </h1>
        <div className="HomePage_conteiner_category">
          {categoryes.map(category => {
            const {
              id,
              to,
              color,
              width,
              imgSrc,
              name,
              count,
            } = category;

            return (
              <div
                key={id}
                className={classNames('HomePage_conteiner_category_box', {
                  'HomePage_conteiner_category_box-hover': hoverId === id,
                })}
                onMouseOverCapture={() => setHoverId(id)}
                onMouseOutCapture={() => setHoverId(0)}
              >
                <Link to={to} className="link">
                  <div
                    className="HomePage_conteiner_category_box_image"
                    style={{ backgroundColor: color }}
                  >
                    <img
                      style={{ width }}
                      src={imgSrc}
                      alt="img"
                      className="HomePage_conteiner_category_box_image_img"
                    />
                  </div>
                  <span className="HomePage_conteiner_category_box_name">
                    {name}
                  </span>
                  <span className="HomePage_conteiner_category_box_count">
                    {count}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hotPrices">
        <ProductsSlider
          phoneList={newPhoneList}
          title={newTitle}
        />
      </div>
    </div>
  );
};
