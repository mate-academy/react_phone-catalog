import home from '@Images/icons/Home.svg';
import style from './productCard.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import arrow from '@Images/icons/Arrow-black-right.svg';

export const ProductCard = () => {
  const { pathname } = useLocation();
  const { productId } = useParams();
  const categoryName = pathname.split('/')[1];

  return (
    <>
      <main className="main">
        <section className="section">
          <div className="container">
            <div className={style.wrapper}>
              <nav className={style.nav}>
                <ul className={style.list}>
                  <li className={style.item}>
                    <Link className={style.link} to="/">
                      <img src={home} alt="" />
                    </Link>
                  </li>
                  <li className={style.item}>
                    <img
                      className={style['item__img-arrow']}
                      src={arrow}
                      alt=""
                    />
                    <Link to={'.'} className={style.item__text}>
                      {' '}
                      {categoryName}
                    </Link>
                  </li>
                  <li className={`${style.item} ${style.items}`}>
                    <img
                      className={style['item__img-arrow']}
                      src={arrow}
                      alt=""
                    />
                    <Link
                      to={'.'}
                      className={`${style.item__text} ${style['item__text--id']}`}
                    >
                      {productId}
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className={style.back}>
                <Link className={style.back__link} to={'/'}>
                  Back
                </Link>
              </div>

              <div>
                <article>
                  <div className={style.card}>
                    <h1></h1>
                    <div className={style.top}>
                      <img src="" alt="" />
                      <div className={style.gallery}></div>
                    </div>
                    <div className={style.bottom}></div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
