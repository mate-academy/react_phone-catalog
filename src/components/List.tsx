import { Props } from '../types';

export const List: React.FC<Props> = ({ phones }) => {
  return (
    <div className="list">
      {phones.map(phone => (
        <div key={phone.id} className="phone-card">
          <h2>{phone.name}</h2>
          <p>Price: ${phone.priceRegular}</p>
          <div className = "image">
            { phone.images.map(image => (
              <img src={ image } alt={phone.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
