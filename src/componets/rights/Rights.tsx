import './Rights.scss';

export const Rights = () => {
  return (
    <div className="rights">
      <div className="rights__block">
        <h1 className="rights__title">
          Warranty and service after purchase
        </h1>
        <div className="rights__paragraphs">
          <p className="rights__text">
            Products sold through the Site are classified into
            two warranty categories:
          </p>
          <p className="rights__text">
            <span className="rights__subtitle">EU-WARRANTY</span>
            – 12- 24 months of &quot;manufacturer warranty&quot;
            (depending on the manufacturer)
          </p>
          <p className="rights__text">
            <span className="rights__subtitle">SELLER WARRANTY</span>
            – 24 months of free warranty provided by our web shop
          </p>
          <p className="rights__text">
            In the case of the warranty being declined, the manufacturer
            or services will make you an offer for the repair of the product.
            In the case that you refuse this offer; the manufacturer has the
            right to require its administrative expenses to be covered by you.
            In the case that you accept the offer; you are obligated to pay
            a total cost of the repair to the manufacturer.
          </p>
        </div>
      </div>
      <div className="rights__block">
        <h1 className="rights__title">
          Cancellation and returning
        </h1>
        <div className="rights__paragraphs">
          <p className="rights__text">
            <span className="rights__subtitle">How to return the device? </span>
            The consumer has the right to return the product within 14 days of
            receiving the order. In case of returns, the customer is responsible
            for returning the product to us in its original condition and for
            postal costs or other costs incurred when returning the product.
          </p>
          <p className="rights__text">
            If the ordered product is returned in identical (undamaged
            condition) we will refund a full amount of the purchase price to
            the customer by PayPal, Credit Card or Bank Transfer depending
            which method of payment is used when the device was purchased.
            Open, used or products in impaired condition will be
            assessed additionally.
          </p>
        </div>
      </div>
    </div>
  );
};
