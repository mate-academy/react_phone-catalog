import './Pagination.scss';

export const Pagination = () => {
  return (
    <div className="catalog__pagination pagination">
      <span className="pagination__item  pagination__left"> &#60;</span>
      <span className="pagination__item pagination__item_active"> 1 </span>
      <span className="pagination__item "> 2 </span>
      <span className="pagination__item "> 3 </span>
      <span className="pagination__item "> 4 </span>
      <span className="pagination__item pagination__rigth"> &#62;</span>
    </div>
  );
};
