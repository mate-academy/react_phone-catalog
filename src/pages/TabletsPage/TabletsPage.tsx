import './style.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import {
  UnderConstruction,
} from '../../components/UnderConstruction/UnderConstruction';

export const TabletsPage = () => {
  return (
    <section className="tablets-page">
      <div className="tablets-page__breadcrumbs">
        <Breadcrumbs />
      </div>
      <div className="tablets-page__content">
        <UnderConstruction />
      </div>
    </section>
  );
};
