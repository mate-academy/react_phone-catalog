import { useLanguage } from '../../context/LanguageContext';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { texts } = useLanguage();

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">{texts.pageNotFound}</h1>
      <img
        className="not-found-page__img"
        src="img/page-not-found.png"
        alt="page-not-found"
      />
    </div>
  );
};
