export const Categories = () => {
  const typesOfGoods = [
    {
      type: 'Mobile phones',
      amount: '95 models',
      url: '_new/img/category-phones.png',
      background: '#f8dbc2',
    },
    {
      type: 'Tablets',
      amount: '0 models',
      url: '_new/img/category-tablets.png',
      background: '#8d8d92',
    },
    {
      type: 'Accessories',
      amount: '0 models',
      url: '_new/img/category-accessories.png',
      background: '#973d5f',
    },

  ];

  return (
    <section className="categories__wrapper">
      <div className="categories">
        <h2 className="categories__title">
          Shop by category
        </h2>
        <div className="categories__type">
          {typesOfGoods.map((good) => (
            <div className="categories__type__card">
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
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
