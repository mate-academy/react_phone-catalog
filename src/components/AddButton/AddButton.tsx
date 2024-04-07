import './AddButton.scss';
type ButtonProps = {
  text: string;
};

export const AddButton: React.FC<ButtonProps> = ({ text }) => {
  return <button className="button button--primary">{text}</button>;
};
