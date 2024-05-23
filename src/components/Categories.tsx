import { NavLink } from 'react-router-dom';
import { useAppContext } from './Context';

export const Categories = () => {

  const { setUrlState } = useAppContext();
  const { setSelectedProduct } = useAppContext()
  const typesOfGoods = [
    {
      type: 'Mobile phones',
      amount: '95 models',
      url: '_new/img/category-phones.png',
      background: '#f8dbc2',
      link: 'phones',
    },
    {
      type: 'Tablets',
      amount: '0 models',
      url: '_new/img/category-tablets.png',
      background: '#8d8d92',
      link: 'tablets',
    },
    {
      type: 'Accessories',
      amount: '0 models',
      url: '_new/img/category-accessories.png',
      background: '#973d5f',
      link: 'accessories',
    },
  ];

  const handleClick = (page: string) => {
    setUrlState(page);
    setSelectedProduct('');
  };

  return (
    <section className="categories__wrapper">
      <div className="categories">
        <h2 className="categories__title">
          Shop by category
        </h2>
        <div className="categories__type">
          {typesOfGoods.map((good) => (
            <NavLink 
              to={good.link}
              className="categories__type__card"
              onClick={() => handleClick(good.link)}
            >
              <div
                className="categories__type__card__background-img"
                style={{
                  backgroundColor: `${good.background}`,
                  backgroundImage: `url(https://mate-academy.github.io/react_phone-catalog/${good.url})`,
                }}
              />
              <div className="categories__type__card__information">
                <h4 className="categories__type__card__information__type">
                  {good.type}
                </h4>
                <h5 className="categories__type__card__information__amount">
                  {good.amount}
                </h5>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
