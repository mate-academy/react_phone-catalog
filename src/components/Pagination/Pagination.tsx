import { Link } from 'react-router-dom';
import './pagination.scss';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const Pagination = () => {
  return (
    <div className="pagination">
      <button type="button" className="pagination__button previous" />
      <div className="pagination__field">
        <Link to="#1" className="pagination__link active">1</Link>
        <Link to="#2" className="pagination__link">2</Link>
        <Link to="#3" className="pagination__link">3</Link>
        <Link to="#4" className="pagination__link">4</Link>
        <Link to="#5" className="pagination__link">5</Link>
      </div>
      <button type="button" className="pagination__button next" />
    </div>
  );
};
