import style from './phones.module.scss';
import home from '@Images/icons/Home.svg';
import arrow from '@Images/icons/Arrow-black-right.svg';
import { useEffect, useState } from 'react';
import { fetchPhones, fetchProducts } from '@Fetch';
import { ProductList } from '@GlobalComponents';
import { Products } from 'src/types/products';

export const PhonePage = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetchPhones().then(setPhones);
  // }, []);

  useEffect(() => {
    fetchProducts().then((data: Products[]) => {
      const result = data.filter((el: Products) => el.category === 'phones');

      setPhones(result);
    });
  }, []);

  return (
    <>
      <div className="container">
        <main className={style.main}>
          <nav className={style.nav}>
            <ul className={style.list}>
              <li>
                <a className={style.link} href="#">
                  <img src={home} alt="" />
                </a>
              </li>
              <li className={style.item}>
                <img className={style['item__img-arrow']} src={arrow} alt="" />
                <span className={style.item__text}>Phones</span>
              </li>
            </ul>
          </nav>

          <ProductList title={'Mobile phones'} data={phones} />
        </main>
      </div>
    </>
  );
};
