import { List } from './List';


export const Body = ({ product }: { product: any }) => (
  <main className="body">
    <h1>Welcome to Nice Gadgets Store!</h1>
    <List products={ product } />
  </main>
);
