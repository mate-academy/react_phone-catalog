import './CountItem.scss';

interface Props {
  count: number;
}

export const CountItem: React.FC<Props> = ({ count }) => {
  return <span className="items__count">{count} models</span>;
};
