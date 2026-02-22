import s from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={`${s.big_img} ${s.not_found}`}>
    <h2 className={`title mb-2 ${s.home_titles} has-text-centered`}>
      Page not found
    </h2>
    <figure className={`image ${s.big_img__figure} ${s.not_found}`}>
      <img src="/img/page-not-found.png" alt={'page not found'} />
    </figure>
  </div>
);
