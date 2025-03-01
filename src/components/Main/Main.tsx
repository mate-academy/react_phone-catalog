import { ProductProvider } from '../../context/ProductsContext';
import BreadcrumbNavigation from '../../services/BreadCrumbs/Breadcrumbs';
import './Main.scss';
import { Outlet } from 'react-router-dom';

export const Main: React.FC = () => {
  return (
    <ProductProvider>
      <main className="main">
        <div className="breadcrumb">
          <BreadcrumbNavigation />
        </div>
        <Outlet />
      </main>
    </ProductProvider>
  );
};
