import loader from './Loader.module.scss';

export const Loader = () => (
  <div className={loader.loader}>
    <div className={loader.loader__content} />
  </div>
);
