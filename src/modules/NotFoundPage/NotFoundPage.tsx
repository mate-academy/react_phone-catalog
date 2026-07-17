import { useLanguage } from '../../context/LanguageContext';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { texts } = useLanguage();

  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">{texts.pageNotFound}</h2>
      <div className="not-found-page__wrapper-img">
        <img
          className="not-found-page__img"
          src="img/page-not-found.png"
          alt="page-not-found"
        />
      </div>
    </div>
  );
};
