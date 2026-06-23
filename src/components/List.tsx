import { Props } from '../types';
import { Card } from './card';

export const List: React.FC<Props> = ({ products }) => {
  return (
    <div className="list">
      {products.map(product => (
        <Card product={ product }/>
      ))}
    </div>
  );
};
