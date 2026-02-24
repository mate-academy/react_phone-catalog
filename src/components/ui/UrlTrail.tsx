import { Link, useLocation } from 'react-router-dom';

const UrlTrail = () => {
  const location = useLocation();

  const path = location.pathname.split('/');

  return (
    <div
      className="flex w-full gap-2 mt-6 h-auto 
    capitalize text-sm justify-start"
    >
      <Link to={`/`}>
        <img src="/img/icons/Home.svg" alt="home" />
      </Link>
      <span>
        <img src="/img/icons/Chevron(Arrow Right).svg" alt="next indicator" />
      </span>
      <Link to={`/${path[1]}`}>
        <p className="">{path[1]}</p>
      </Link>
      {path.length > 2 && (
        <>
          <span>
            <img
              src="/img/icons/Chevron(Arrow Right).svg"
              alt="next indicator"
            />
          </span>
          <p className="text-gray-400">{path[2].split('-').join(' ')}</p>
        </>
      )}
    </div>
  );
};

export default UrlTrail;
