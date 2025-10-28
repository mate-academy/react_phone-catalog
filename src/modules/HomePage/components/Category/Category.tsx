import { fetchAccessories, fetchPhones, fetchTablets } from '@Fetch';
import style from './Category.module.scss';

import { useEffect, useState } from 'react';
import { images } from '.';

export const Category = () => {
  const [phones, setPhones] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetchPhones().then(setPhones);
  }, []);

  useEffect(() => {
    fetchAccessories().then(setAccessories);
  }, []);

  useEffect(() => {
    fetchTablets().then(setTablets);
  });

  return (
    <section className="section">
      <div className="container">
        <h1 className={`${style.title} title`}>Shop by category</h1>

        <div className={style.category}>
          <div className={`${style.phones} ${style.active}`}>
            <a href="#" className={style.category__link}>
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet={images.phoneMobile}
                  type="image/avif"
                />

                <source
                  media="(min-width: 1024px)"
                  srcSet={images.phoneDekstop}
                  type="image/png"
                />

                <img src={images.phoneDekstop} alt="category phone" />
              </picture>
              <div className={style.bottom}>
                <h2 className="title">Mobile phones</h2>
                <span>{phones.length} models</span>
              </div>
            </a>
          </div>
          <div className={`${style.tablets} ${style.active}`}>
            <a href="#" className={style.category__link}>
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet={images.tabletMobile}
                  type="image/avif"
                />

                <source
                  media="(min-width: 1024px)"
                  srcSet={images.tableDekstop}
                  type="image/png"
                />

                <img src={images.tableDekstop} alt="category phone" />
              </picture>
              <div className={style.bottom}>
                <h2 className="title">Tablets</h2>
                <span>{tablets.length} models</span>
              </div>
            </a>
          </div>
          <div className={`${style.accessories} ${style.active}`}>
            <a href="#" className={style.category__link}>
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet={images.accessoryMobile}
                  type="image/avif"
                />

                <source
                  media="(min-width: 1024px)"
                  srcSet={images.accessoryDekstop}
                  type="image/png"
                />

                <img src={images.accessoryDekstop} alt="category phone" />
              </picture>
              <div className={style.bottom}>
                <h2 className="title">Accessories</h2>
                <span>{accessories.length} models</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
