type Props = {
  pages: number;
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return <p className="pagination">Pagination component</p>;
};
