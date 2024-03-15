type Props = {
  title: string,
};
export const ErrorMessage:React.FC<Props> = ({
  title,
}) => {
  return (
    <h1
      style={{
        paddingTop: '24px',
      }}
    >
      {title}
    </h1>
  );
};
