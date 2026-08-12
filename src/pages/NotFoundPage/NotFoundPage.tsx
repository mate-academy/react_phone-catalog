import { PageMessage } from '../../components/PageMessage';
import { useTranslation } from '../../hooks';

export const NotFoundPage = () => {
  const t = useTranslation();

  return (
    <PageMessage
      title={t.notFound.title}
      text={t.notFound.text}
      image="img/page-not-found.png"
      actionText={t.common.goHome}
      actionTo="/"
      titleTag="h1"
    />
  );
};
