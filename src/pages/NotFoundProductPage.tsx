import { GoBackLink } from '../components/ui/GoBackLink';

type NotFoundProductPageProps = {
  title: string;
};

export const NotFoundProductPage: React.FC<NotFoundProductPageProps> = ({
  title,
}) => {
  return (
    <div className="not-found-product">
      <div className="not-found-product__goback-link">
        <GoBackLink />
      </div>

      <div className="not-found-product__title-block">
        <h2>{title}</h2>
      </div>

      <div className="not-found-product__img-block"></div>
    </div>
  );
};
