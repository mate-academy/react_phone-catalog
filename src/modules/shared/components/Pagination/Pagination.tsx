type Props = {
  total: number | undefined;
  perPage: number;
  // currentPage: number;
};

export const Pagination = ({ total, perPage }: Props) => {
  const getPages = (totalPages: number | undefined) => {
    return [...Array(totalPages)].map((_, i) => i + 1);
  };

  let totalPages = 0;

  if (total === undefined) {
    totalPages = 0;
  } else {
    totalPages = Math.ceil(total / perPage);
  }

  const pages = getPages(totalPages);

  return (
    <>
      <div>
        <ul>
          {pages.map(elem => {
            return <li key={elem}>{elem}</li>;
          })}
        </ul>
      </div>
    </>
  );
};
