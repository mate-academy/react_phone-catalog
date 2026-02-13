import { Main } from '../../components/Main/Main';
import { PageTop } from '../../components/PageTop';
import { CartsList } from './components/CartsList';

export const SelectedItemsPage = () => {
  return (
    <Main className="carts">
      <PageTop
        titleText="Cart"
        titleLevel={1}
        back={true}
        crums={false}
        itemsContent={false}
      />
      <CartsList />
    </Main>
  );
};
