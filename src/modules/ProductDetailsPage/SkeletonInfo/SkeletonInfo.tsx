import { OutlineBottom } from '../components/OutlineBottom';
import style from './SkeletonInfo.module.scss';

export const SkeletonInfo = () => (
  <section className={style.section}>
    <article className={style.skeleton}>
      <h1 className={`is-skeleton ${style.skeleton__title}`}>Title</h1>
      <div className={`is-skeleton ${style.skeleton__back}`}></div>
      <div className={`is-skeleton ${style.skeleton__name}`}></div>
      <figure className={`image is-skeleton ${style.skeleton__images}`}>
        <img alt="Placeholder" src="https://placehold.co/128x128" />
      </figure>
      <div className={` ${style.skeleton__variant}`}>
        {['1', '2', '3', '4', '5'].map(item => (
          <figure
            key={item}
            className={`image is-skeleton ${style['skeleton__variant-img']}`}
          >
            <img alt="Placeholder" src="https://placehold.co/" />
          </figure>
        ))}
      </div>
      <div className={style.skeleton__info}>
        <h2 className="subtitle is-skeleton"></h2>
        <h1 className="title has-skeleton"></h1>
        <OutlineBottom modifier="skeleton" />
        <h2 className="subtitle is-skeleton"></h2>
        <h1 className="title has-skeleton"></h1>
        <OutlineBottom modifier="skeleton" />
        <h2 className="subtitle is-skeleton"></h2>
        <h1 className="title has-skeleton"></h1>
      </div>

      <div className={style.skeleton__about}>
        <h1 className="title has-skeleton"></h1>
        <OutlineBottom modifier="skeleton" />
        <h2 className="subtitle is-skeleton"></h2>
        <div className="skeleton-lines">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1 className="title has-skeleton"></h1>
        <OutlineBottom modifier="skeleton" />
        <h2 className="subtitle is-skeleton"></h2>
        <div className="skeleton-lines">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </article>
  </section>
);
