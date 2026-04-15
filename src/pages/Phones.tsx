// import { ProductCarts } from '../components/ProductCart/ProductCarts';
import { PropsPhone } from '../types/PropsPhone';

export const Phones: React.FC<PropsPhone> = ({}) => {
  return (
    <div className="container">
      <h1 className="title">Phones</h1>

      {/* {phones.map(phone => (
        <ProductCarts
          key={phone.id}
          id={phone.id}
          title={phone.title}
          price={phone.price}
          screen={phone.screen}
          capacity={phone.capacity}
          ram={phone.ram}
        />
      ))} */}
    </div>
  );
};
