import { PageType } from '../helpers/Types';

export type NoItemsProps = {
  page: PageType
};

export const NoItems = ({ page }:NoItemsProps) => {
  return (
    <div className="home">
      <div className="home__header">
        <h1 className="home__header--title">
          {`There is no ${page}`}
        </h1>

      </div>
    </div>
  );
};
