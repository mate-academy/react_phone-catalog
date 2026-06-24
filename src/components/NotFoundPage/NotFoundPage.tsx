import './NotFoundPage.scss';
import '../../../public/img/product-not-found.png';

export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1 className="title">404 not found</h1>
      <img
        src={'../../../public/img/page-not-found.png'}
        alt="here should be an image"
        width="100%"
      />
    </div>
  );
};
