import cn from 'classnames';
import style from './notFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={cn(style['not-found-page'])}>
      <div className={cn(style['not-found-page__content'], 'container')}>
        <h1 className={cn(style['not-found-page__title'])}>Page not found</h1>
        <div className={cn(style['not-found-page__svg'])}></div>
      </div>
    </section>
  );
};
