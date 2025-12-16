import { List } from './list';

export const Body = ({ phones }) => (
  <main className="body">
    <h1>Mobile phones</h1>
    <List phones={phones} />
  </main>
);
