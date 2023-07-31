/* eslint-disable max-len */
import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import './TabletsPage.scss';

export const TabletsPage = () => {
  return (
    <div className="tablets-page">
      <MainNavigation />

      <div className="tablets-page__container">
        <h1 className="phones-page__title">
          Tablets
        </h1>

        <div className="tablets-page__text text">
          <h1 className="text__title">
            Oops!
          </h1>

          <h2 className="text__desc">
            Apologies for the inconvenience, but
            <strong className="text__strong">tablets</strong>
            are not available yet!
            <br />
            We appreciate your understanding.
          </h2>

          <p className="error__desc">
            Maybe you want to go back to
            <a href="https://danylopasko.github.io/react_phone-catalog/#/" className="error__link"> Home page </a>
            ?
          </p>
        </div>
      </div>
    </div>
  );
};
