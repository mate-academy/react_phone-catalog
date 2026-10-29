import './CategoryCard.scss';
interface Props {
  imageSrc: string;
  title: string;
  amount: number;
}
export const CategoryCard: React.FC<Props> = ({ imageSrc, title, amount }) => {
  return (
    <div className="CategoryCard">
      <img className="CategoryCard-photo" src={imageSrc} alt="" />
      <span className="CategoryCard-title">{title}</span>
      <span className="CategoryCard-amount">{amount + ' models'}</span>
    </div>
  );
};
