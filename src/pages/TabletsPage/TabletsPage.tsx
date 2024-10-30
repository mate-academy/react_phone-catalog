import './TabletsPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const TabletsPage = () => {
  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Phones" />
        <h1 className="title">Tablets not found</h1>
      </div>
    </main>
  );
};
