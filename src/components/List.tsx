type Props = {
  phones: Phone[];
};

export const List: React.FC<Props> = ({ phones }) => {
  return (
    <div className="list">
      {phones.map(phone => (
        <div key={phone.id} className="phone-card">
          <h2>{phone.name}</h2>
        </div>
      ))}
    </div>
  );
};
