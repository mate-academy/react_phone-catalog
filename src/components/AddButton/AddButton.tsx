import './AddButton.scss';
import cn from 'classnames';

type ButtonProps = {
  text: string;
  onClick: () => void;
};

export const AddButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className={cn('button', 'button--primary', {
        'button--secondary': text === 'Added',
      })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
