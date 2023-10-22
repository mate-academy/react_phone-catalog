import cl from './Loader.module.scss';

function Loader() {
  return (
    <div className={cl.loader_wrapper}>
      <div className={cl.loader} />
    </div>
  );
}

export default Loader;
