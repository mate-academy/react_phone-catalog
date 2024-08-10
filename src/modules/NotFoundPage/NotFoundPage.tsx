import { HeadingLevel } from '../../types/HeadingLevel';
import { Title } from '../../components/Title';

export const NotFoundPage = () => {
  return (
    <div className="container">
      <Title level={HeadingLevel.h1}>Page not found</Title>
      <img
        src="./img/page-not-found.png"
        alt="Page not found"
        className="page-not-found"
      />
    </div>
  );
};
