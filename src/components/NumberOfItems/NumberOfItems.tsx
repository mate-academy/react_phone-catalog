import './NumberOfItems.scss';

type Props = {
  amount: number;
};

export const NumberOfItems: React.FC<Props> = ({ amount }) => {
  return <div className="number-of-items">{amount}</div>;
};
