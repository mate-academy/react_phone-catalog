import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  const data = [
    {
      img: 'phones.png',
      title: 'Mobile phones',
      quantity: '95 models',
    },
    {
      img: 'tablets.png',
      title: 'Tablets',
      quantity: '24 models',
    },
    {
      img: 'accessories.png',
      title: 'Accessories',
      quantity: '100 models',
    },
  ];

  return (
    <div className="container">

      <div className="category">
        <h2 className="category__main-title">
          ShopByCategory
        </h2>

        <div className="category__links">
          {data.map(item => (
            <Link
              to={`/${item.img.slice(0, -4)}`}
              className="category__card"
              key={item.img}
              data-cy="categoryLinksContainer"
            >
              <div className={`
            category__photoContainer
            category__photoContainer--${item.img.slice(0, -4)}`}
              >
                <img
                  src={`_new/img/category-${item.img}`}
                  alt={`category-${item.img.slice(0, -4)}`}
                  className={`category__photo category__photo--${item.img.slice(0, -4)}`}
                />
              </div>

              <p className="category__title">
                {item.title}
              </p>

              <p className="category__subtitle">
                {item.quantity}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
