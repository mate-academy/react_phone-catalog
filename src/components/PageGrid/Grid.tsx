import './PageGrid.scss';

export const Grid = ({ children }) => {
  return (
    <div className="container">
      <div className="page-grid">{children}</div>
    </div>
  );
};
