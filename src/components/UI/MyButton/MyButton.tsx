import './MyButton.scss';

type Props = {
  children: React.ReactNode;
};

export const MyButton: React.FC<Props> = ({ children }) => {
  return (
    <button type="button" className="my-button">
      {children}
    </button>
  );
};
