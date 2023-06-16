import { Link } from 'react-router-dom';
import home from '../../../images/Home.svg';
import arrow from '../../../images/Vector (Stroke).svg';
import './PageIndicator.scss';

type Props = {
  productName?: string,
  productType: string,
};

export const PageIndicator: React.FC<Props> = ({
  productName, productType,
}) => {
  return (
    <div
      data-cy="breadCrumbs"
      className="phones-page__indicator indicator-name"
    >
      <div className="indicator-name__image">
        <Link to="/">
          <img src={home} alt="home" className="indicator-name__img" />
        </Link>
      </div>
      <img
        src={arrow}
        alt="arrowBack"
        className="indicator-name__arrow"
      />
      <Link
        to={`/${productType.toLowerCase()}`}
        className="indicator-name__title"
      >
        {productType}
      </Link>
      {productName && (
        <>
          <img
            src={arrow}
            alt="arrowBack"
            className="indicator-name__arrow"
          />
          <div className="indicator-name__title">{productName}</div>
        </>
      )}
    </div>
  );
};
