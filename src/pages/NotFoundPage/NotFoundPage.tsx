import '../../styles/pages/NotFoundPage/NotFoundPage.scss';

import { GoBackButton } from '../../components/GoBackButton';

export const NotFoundPage = () => (
  <main className="not-found">
    <GoBackButton />

    <h1 className="not-found__title">
      {'We are sorry, but this page doesn\'t exist'}
    </h1>
  </main>
);
