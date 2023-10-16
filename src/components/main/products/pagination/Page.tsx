import classNames from 'classnames';

type PageProps = {
  pageNumber: number
  isSelected: boolean
  onClick: (page: number) => void
};

export const Page = ({ pageNumber, isSelected, onClick }: PageProps) => {
  const classes = classNames('page', { page__active: isSelected });

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onClick(pageNumber)}
      disabled={isSelected}
    >
      {pageNumber}
    </button>
  );
};
