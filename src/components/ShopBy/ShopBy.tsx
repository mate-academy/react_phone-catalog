import { Link } from 'react-router-dom';
import s from './ShopBy.module.scss';

const categories = [
  {
    to: '/phones',
    imgSrc: 'img/category-phones.webp',
    name: 'Mobile phones',
    count: '95 models',
    imgClass: s.ShopBy__blockImgOne,
  },
  {
    to: '/tablets',
    imgSrc: 'img/category-tablets.png',
    name: 'Tablets',
    count: '24 models',
    imgClass: s.ShopBy__blockImgTwo,
  },
  {
    to: '/accessories',
    imgSrc: 'img/category-accessories.webp',
    name: 'Accessories',
    count: '100 models',
    imgClass: s.ShopBy__blockImgThree,
  },
];

export const ShopBy = () => {
  return (
    <section className={s.ShopBy}>
      <h2 className={s.ShopBy__title}>Shop by category</h2>

      <div className={s.ShopBy__categories}>
        {categories.map(({ to, imgSrc, name, count, imgClass }, index) => (
          <div key={index} className={s.ShopBy__category}>
            <Link to={to} className={`${s.ShopBy__blockImg} ${imgClass}`}>
              <img
                src={imgSrc}
                alt={name}
                className={`${s.ShopBy__img} ${s.ShopBy__imgOne}`}
              />
            </Link>
            <div className={s.ShopBy__info}>
              <h4 className={s.ShopBy__name}>{name}</h4>
              <p className={s.ShopBy__count}>{count}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
