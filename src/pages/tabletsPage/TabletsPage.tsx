import { PublicPath } from '../../components/PublicPath';
import './TabletsPage.scss';

export const TabletsPage = () => {
  return (
    <div className="tablets-page">
      <PublicPath linkName="tablets" />
      <h1
        className="tablets-page__header"
      >
        Tablets are out of stock &#128517;
      </h1>
    </div>
  );
};
