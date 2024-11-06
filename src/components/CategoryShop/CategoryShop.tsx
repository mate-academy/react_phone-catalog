import style from './CategoryShop.module.scss';
import mobiles from '../../assets/img/categoryShop/mobile.png';
import tablet from '../../assets/img/categoryShop/tablet.png';
import accessories from '../../assets/img/categoryShop/accessories.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductProvider';

export const CategoryShop = () => {
  const { products } = useContext(ProductContext);

  const countItemsByCategory = (category: string) => {
    return [...products].filter(item => item.category === category);
  };

  const categories = [
    {
      img: mobiles,
      name: 'Mobile phones',
      models: `${countItemsByCategory('phones').length} models`,
      href: 'phones',
    },
    {
      img: tablet,
      name: 'Tablets',
      models: `${countItemsByCategory('tablets').length} models`,
      href: 'tablets',
    },
    {
      img: accessories,
      name: 'Accessories',
      models: `${countItemsByCategory('accessories').length} models`,
      href: 'accessories',
    },
  ];

  return (
    <section className={style.categoryShop}>
      <h2 className={style.title}>Shop by category</h2>
      <div className={style.content}>
        {categories.map(({ img, name, models, href }) => (
          <article key={name} className={style.article}>
            <NavLink to={href}>
              <img src={img} alt={name} className={style.article__img} />
              <h4 className={style.article__name}>{name}</h4>
              <p className={style.article__countModels}>{models}</p>
            </NavLink>
          </article>
        ))}
      </div>
    </section>
  );
};
