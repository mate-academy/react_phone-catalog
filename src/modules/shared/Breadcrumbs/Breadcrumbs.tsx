import './Breadcrumbs.scss';

type Props = {
  productType: string;
  productName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productType, productName }) => {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__container">
        <a
          href="/"
          className="breadcrumbs__link-home"
          aria-label="Go to home page"
        ></a>
        <span className="breadcrumbs__arrow"></span>
        <span className="breadcrumbs__item">{productType}</span>

        {productName && (
          <>
            <span className="breadcrumbs__arrow"></span>
            <span className="breadcrumbs__item">{productName}</span>
          </>
        )}
      </div>
    </div>
  );
};
