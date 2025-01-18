import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../../store/GlobalProvider';

export const ShopByCategory = () => {
  const { categories } = useContext(StateContext);

  return (
    <section className="shopByCategory">
      <h2 className="shopByCategory__title">Shop by category</h2>
      <div className="shopByCategory__box">
        {categories.map(cat => (
          <Link to={`/${cat.id}`} key={cat.id}>
            <div className="shopByCategory__img-box">
              <img
                src={cat.image}
                alt="Phones"
                className="shopByCategory__img"
              />
            </div>
            <h4 className="shopByCategory__name">{cat.title}</h4>
            <p className="shopByCategory__count">{`${cat.productsCount} models`}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
