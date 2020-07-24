import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';

import html2canvas from 'html2canvas';
import { sendToServer } from './api/postReviewBug';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { TabletsPage } from './components/ProductPage/TabletsPage';
import { getProducts } from './api/api';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/ProductPage/PhonesPage';
import { ProductInfo } from './components/ProductPage/ProductInfo';
import { FavouritePageRedux } from './components/Favourite/FavouritePageRedux';
import { CartPageRedux } from './components/Cart/CartPageRedux';
import { getCart, getFavorites } from './store';
import { Footer } from './components/Footer';
import { Marker } from './components/Debugger/Marker';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const itemsCart = useSelector(getCart);
  const favorites = useSelector(getFavorites);
  const [markerX, setMarkerX] = useState(0);
  const [markerY, setMarkerY] = useState(0);
  const [commentX, setCommentX] = useState(markerX);
  const [commentY, setCommentY] = useState(markerY);
  const [statusOfMarker, setStatusOfMarker] = useState(false);
  const [statusOfComment, setStatusOfComment] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [statusSend, setStatusSend] = useState(false);
  const [linkPhoto, setLinkPhoto] = useState('');

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...itemsCart]));
  }, [itemsCart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const handleMarker = () => {
    setStatusOfComment(false);
    setActiveButton(false);
    setStatusSend(false);
    setCommentText('');
    setStatusOfMarker(!statusOfMarker);
  };

  const handleFollowMarker = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!statusOfMarker) {
      return;
    }

    setMarkerX(event.pageX - 5);
    setMarkerY(event.pageY - 5);
  };

  const enterComment = (value: string) => {
    if (value.trim()) {
      setActiveButton(true);
    }

    setCommentText(value);
  };

  const sendDataToServer = () => {
    if (!commentText.trim()) {
      return;
    }

    const body = document.querySelector('body');

    setStatusSend(true);
    setStatusOfMarker(false);
    if (body) {
      html2canvas(body).then(canvas => {
        const croppedCanvas = document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');
        const pictureWidth = document.documentElement.clientWidth;
        const pictureHeight = document.documentElement.clientHeight;
        const scrollHeight = window.pageYOffset;

        croppedCanvas.width = pictureWidth;
        croppedCanvas.height = pictureHeight;
        if (croppedCanvasContext) {
          croppedCanvasContext.drawImage(
            canvas,
            0,
            scrollHeight,
            pictureWidth,
            pictureHeight,
            0,
            0,
            pictureWidth,
            pictureHeight,
          );
        }

        setLinkPhoto(croppedCanvas.toDataURL());
        sendToServer(commentText, croppedCanvas.toDataURL());
      });
    }
  };

  const renderComment = () => {
    if (!statusSend) {
      return (
        <form onSubmit={sendDataToServer} style={{ top: commentY, left: commentX }} className="formComment">
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input autoFocus value={commentText} onChange={(event) => enterComment(event.target.value)} className="formComment__input" type="textarea" placeholder="Ваш комментарий..." />
          {activeButton && <button className="formComment__button" type="button" onClick={sendDataToServer}>Отправить</button>}
        </form>
      );
    }

    return (
      <div style={{ top: commentY, left: commentX }} className="formComment formComment--send">
        <span>Комментарий отправлен!</span>
        <a href={linkPhoto}>link</a>
      </div>
    );
  };

  const handleCommentBug = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!statusOfMarker || statusOfComment) {
      return;
    }

    setCommentX(event.pageX);
    setCommentY(event.pageY);
    setStatusOfComment(true);
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className="App" onClick={(event) => handleCommentBug(event)} onMouseMove={event => handleFollowMarker(event)}>
      <div className="debugger">
        {statusOfMarker && <Marker markerY={markerY} markerX={markerX} />}
        {statusOfComment && renderComment()}
      </div>
      <Header />
      <main className="main">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage products={products} />
            )}
          />
          <Route
            exact
            path="/phones"
            render={() => (
              <PhonesPage />
            )}
          />
          <Route
            exact
            path="/tablets"
            render={() => (
              <TabletsPage />
            )}
          />
          <Route
            path={['/phones/:productId?', '/tablets/:productId?', '/accessories/:productId?']}
            render={({ match }) => {
              const prod = products.find(item => item.id === match.params.productId);

              if (prod) {
                return (
                  <ProductInfo product={prod} id={match.params.productId} />
                );
              }

              return <HomePage products={products} />;
            }}
          />
          <Route path="/favorite" exact component={FavouritePageRedux} />
          <Route path="/cart" exact component={CartPageRedux} />
          <Redirect from="/home" to="/" />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer handleMarker={handleMarker} statusOfMarker={statusOfMarker} />
    </div>
  );
};

export default App;
