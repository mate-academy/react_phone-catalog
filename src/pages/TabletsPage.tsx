import { BreadCrumbs } from '../componets/breadcrumbs/BreadCrumbs';
import { Construction } from '../componets/construction/Construction';
import { PageHeading } from '../componets/pageHeading/PageHeading';

export const TabletsPage = () => {
  return (
    <div className="page__container">
      <BreadCrumbs title="Tablets" link="/tablets" />
      <PageHeading title="Tablets" />
      <Construction />
    </div>
  );
};
