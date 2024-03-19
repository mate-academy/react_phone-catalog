type Props = {
  page: string,
};

export const NoResults : React.FC<Props> = ({ page }) => {
  return (
    <h1>{`There are no ${page} yet`}</h1>
  );
};
