import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <img
        src={`${import.meta.env.VITE_PUBLIC_URL}/img/loading.svg`}
        alt="loading icon svg"
      />
    </div>
  );
};

export default Loading;
