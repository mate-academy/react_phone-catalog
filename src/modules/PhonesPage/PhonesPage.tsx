import style from './phones.module.scss';
import home from '@Images/icons/Home.svg';
import arrow from '@Images/icons/Arrow-black-right.svg';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@Fetch';
import { ProductList } from '@GlobalComponents';
import { Products } from 'src/types/products';

export const PhonePage = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);

    fetchProducts().then((data: Products[]) => {
      const result = [...data]
        .filter((el: Products) => el.category === 'phones')
        .sort((a, b) => b.year - a.year);

      setPhones(result);
      setIsloading(false);
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

          {!isLoading && (
            <ProductList
              loading={isLoading}
              title={'Mobile phones'}
              data={phones}
            />
          )}
        </main>
      </div>
    </>
  );
};
