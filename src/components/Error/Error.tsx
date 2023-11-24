type Props = {
  message?: string;
};

export const Error: React.FC<Props> = ({
  message = 'Oops... Something went wrong. Please try to reload the page.',
}) => {
  return (
    <div className="error">{message}</div>
  );
};
