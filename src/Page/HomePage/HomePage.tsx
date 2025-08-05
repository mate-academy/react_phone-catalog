import { SwiperBaner } from './../../component/modules/SwiperBaner';
import { Categories } from './../../component/Categories';
import style from './HomePage.module.scss';

export const HomePage = () => {
  const slides = [
    './img/Logo/baner-header.png',
    './img/Logo/baner-header.png',
    './img/Logo/baner-header.png',
  ];

  return (
    <section className={style.home__page}>
      <div className={style.home__page__wrapper}>
        <h1 className={style.home__page__title}>
          Welcome to Nice <br className={style['home__page__title-break']} />
          Gadgets store!
        </h1>
        <SwiperBaner slides={slides} />
      </div>

      <Categories />
    </section>
  );
};
