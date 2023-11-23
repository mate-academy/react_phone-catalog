import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import './AccessoriesPage.scss';

const AccessoriesPage = () => {
  return (
    <section className="accessories main__page">
      <BreadCrumbs />
      <div className="accessories__empty">
        <p className="accessories__empty__message">Accessories not found</p>
      </div>
    </section>
  );
};

export default AccessoriesPage;
