type Props = {
  title: string;
  buttonUse: string;
};

export const Button: React.FC<Props> = ({ title, buttonUse }) => {
  return <div className={`button button--${buttonUse}`}>{title}</div>;
};
