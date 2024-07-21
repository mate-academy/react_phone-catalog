import notFoundImg from '../images/page-not-found.png';

export const NotFoundPage = () => (
  <div
    className="flex-1 bg-contain bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${notFoundImg})` }}
  />
);
