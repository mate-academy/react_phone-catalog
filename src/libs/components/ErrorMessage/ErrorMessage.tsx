type Props = {
  title: string,
};
export const ErrorMessage:React.FC<Props> = ({
  title,
}) => {
  return (
    <h1>
      {title}
    </h1>
  );
};
