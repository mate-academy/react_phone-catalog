import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { GadgetsList } from '../../components/GadgetsList/GadgetsList';
export const CartPage = () => {

  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Favorites" />
      </div>
    </main>
  );
};
