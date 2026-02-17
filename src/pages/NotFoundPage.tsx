import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation('notfoundpage');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 font-mono">
      <div className="text-8xl animate-bounce mb-4">🦄</div>
      <h1 className="text-5xl font-extrabold text-blue-600 mb-2">404</h1>
      <p className="text-2xl text-blue-900 mb-8">
        {t('title')}
        <br />
        {t('subtitle')}
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
      >
        {t('goHome')}
      </Link>
      <button
        className="mt-8 text-blue-700 underline hover:text-pink-500"
        onClick={() => alert(t('secretAlert'))}
      >
        {t('secretButton')}
      </button>
    </div>
  );
};
