import './PageNotFound.module.scss';
import NotFoundImg from '../../../public/img/page-not-found.png';

export const PageNotFound = () => {
  return (
    <>
      <section className="not-found">
        <img className="not-found_img" src={NotFoundImg} alt="not found" />
      </section>
    </>
  );
};
