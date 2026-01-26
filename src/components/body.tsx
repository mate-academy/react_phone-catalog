import { List } from './List';


export const Body = ({ product }: { product: any }) => (
  <main className="body">
    <h1>Mobile phones</h1>
    <List phones={ product } />
  </main>
);
