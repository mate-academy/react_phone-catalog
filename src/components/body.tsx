import { Home } from './Home';
import { List } from './List';


export const Body = ({ product, phones }: { product: any }) => (
  <main className="body">
    <Home products={ product } phones={phones}/>
  {/*  <List products={ product } />*/}
  </main>
);
