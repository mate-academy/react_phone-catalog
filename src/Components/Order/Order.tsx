import './Order.scss';

export const Order = () => {
  return (
    <div className="container-order">
      <div className="message">
        <h1 className="gradient-text"> Now available in our store!&nbsp;</h1>
        <span role="img" aria-label="thumbs up">
          👍
        </span>
      </div>
      <span className="sub-message">Be the first!</span>
      <button className="order-button">ORDER NOW</button>
    </div>
  );
};
