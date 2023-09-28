import './ErrorMessage.scss';

type Props = {
  text: string,
};

export const ErrorMessage:React.FC<Props> = ({ text }) => {
  return (
    <div className="err-mess">
      {text}
    </div>
  );
};
