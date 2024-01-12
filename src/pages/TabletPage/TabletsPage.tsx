import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import './TabletsPage.scss';

export const TabletsPage = () => {
  return (
    <section className="tablets">
      <div className="tablets__container">
        <div className="tablets__breadcrumbs">
          <BreadCrumbs page="Tablets" />
        </div>

        <div className="tablets__alert">
          <p className="tablets__alert-title">There is no products on this page for now. We are working on it.</p>
        </div>
      </div>
    </section>
  );
};
