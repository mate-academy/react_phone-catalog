import { PublicPath } from '../../components/PublicPath';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  return (
    <div className="accessories-page">
      <PublicPath linkName="accessories" />
      <h1
        className="accessories-page__header"
      >
        Accessories are out of stock &#128517;
      </h1>
    </div>
  );
};
