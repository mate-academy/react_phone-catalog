import './NotFoundPage.scss';
import { Link } from 'react-router-dom';
// import PageNotFoundImage from './NotFoundPageImage/notFound.svg';
import HomeImage from './NotFoundPageImage/Home.svg';
import Arrowimage from './NotFoundPageImage/Arrow.svg';

interface TitlePropsS {
  title: string;
  h1: string;
  text: string
}

export const NotFoundPage = ({ title, h1, text }: TitlePropsS) => {
  return (
    <>
      <div className="block-for-svg">
        <Link to="/">
          <div className="block-for-svg-home">
            <img className="icon" src={HomeImage} alt="HomeImage" />
          </div>
        </Link>

        <div className="block-for-svg-home-arrow">
          <img className="icon" src={Arrowimage} alt="Arrowimage" />
        </div>

        <p className="block-forPageNotFound__text-1">{title}</p>
      </div>

      <div className="block-forPageNotFound">
        <h1 className="block-forPageNotFound__title">{h1}</h1>
        <p className="block-forPageNotFound__text">
          {text}
          {' '}
          <Link to="/" className="Link">
            <span className="block-forPageNotFound__text-span">
              home page
            </span>
          </Link>
        </p>
        {/* <img className="image" src={PageNotFoundImage} alt="PageNotFound" /> */}

        <div className="birds">
          <div className="birds__hatdove">
            <div className="birds__hatdove-shadow" />
            <div className="birds__hatdove-head">
              <div className="birds__hatdove-hat" />
              <div className="birds__hatdove-forehead" />
              <div className="birds__hatdove-eye" />
              <div className="birds__hatdove-eye" />
              <div className="birds__hatdove-beak" />
            </div>
            <div className="birds__hatdove-backwing" />
            <div className="birds__circles-1" />
            <div className="birds__hatdove-backleg">
              <div className="birds__curly" />
            </div>
            <div className="birds__hatdove-body" />
            <div className="birds__hatdove-frontleg">
              <div className="birds__curly" />
            </div>
            <div className="birds__hatdove-frontwing" />
            <div className="birds__circles-2" />
            <div className="birds__hatdove-frontwing-finger" />
            <div className="birds__hatdove-frontwing-finger" />
            <div className="birds__hatdove-frontwing-finger" />
          </div>
          <div className="birds__table">
            <div className="birds__table-shadow" />
          </div>
          <div className="birds__laptop" />
          <div className="birds__laptop">
            <div className="birds__monitor">
              <div className="birds__code" />
            </div>
          </div>
          <div className="birds__coffee" />
          <div className="birds__feather" />
          <div className="birds__feather" />
          <div className="birds__rundove-shadow" />
          <div className="birds__rundove">
            <div className="birds__rundove-backwing">
              <div className="birds__finger" />
              <div className="birds__finger" />
              <div className="birds__finger" />
              <div className="birds__circles" />
            </div>
            <div className="birds__rundove-head">
              <div className="birds__rundove-eye" />
              <div className="birds__rundove-eye" />
              <div className="birds__rundove-beak" />
            </div>
            <div className="birds__rundove-backleg">
              <div className="birds__curly" />
            </div>
            <div className="birds__rundove-body" />
            <div className="birds__rundove-frontleg">
              <div className="birds__curly" />
            </div>
            <div className="birds__rundove-frontwing">
              <div className="birds__finger" />
              <div className="birds__finger" />
              <div className="birds__finger" />
              <div className="birds__circles" />
            </div>
          </div>
        </div>
      </div>
    </>

  );
};
