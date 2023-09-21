import { BreadCrumbs } from '../componets/breadcrumbs/BreadCrumbs';
import { Construction } from '../componets/construction/Construction';
import { PageHeading } from '../componets/pageHeading/PageHeading';

export const AccessoriesPage = () => {
  return (
    <div className="page__container">
      <BreadCrumbs title="Accessories" link="/accessories" />
      <PageHeading title="Accessories" />
      <Construction />
    </div>
  );
};
