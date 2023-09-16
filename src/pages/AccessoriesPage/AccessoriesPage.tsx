import './style.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import {
  UnderConstruction,
} from '../../components/UnderConstruction/UnderConstruction';

export const AccessoriesPage = () => {
  return (
    <section className="accessories-page">
      <div className="accessories-page__breadcrumbs">
        <Breadcrumbs />
      </div>
      <div className="accessories-page__content">
        <UnderConstruction />
      </div>
    </section>
  );
};
