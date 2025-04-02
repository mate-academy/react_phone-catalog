import loaderStyles from './Loader.module.scss';

export const Loader = () => {
  console.log('loader');

  return (
    <div className={loaderStyles.loader}>
      <div className={loaderStyles.loader__content} />
    </div>
  );
};
