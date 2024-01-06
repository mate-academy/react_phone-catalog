/* eslint-disable max-len */
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Line } from '../../elements/Line/Line';
import './ReturnPage.scss';

export const ReturnPage = () => {
  return (
    <div className="return">
      <Breadcrumbs page="rights & refunds" />
      <h1 className="return__title">Returns & Refunds</h1>
      <p className="return__small">Changed your mind? We are happy to accept returns for a full refund within 30 days for most items.</p>

      <div className="return__content">
        <article className="return__article">
          <h2 className="return__title-h2">30-Day Return Policy</h2>
          <p className="return__text">We offer a 30-day return policy, which means you have 30 days after receiving your item to request a return. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.</p>
          <Line />
        </article>

        <article className="return__article">
          <h2 className="return__title-h2">Easy Return Process</h2>
          <p className="return__text">To initiate a return, simply follow these easy steps:</p>
          <ul className="return__list">
            <li className="return__list-item">
              <strong className="return__bold">Contact Us: </strong>
              Reach out to our customer service team within 30 days of receiving your order.
            </li>
            <li className="return__list-item">
              <strong className="return__bold">Provide Details: </strong>
              Please provide your order number and the reason for your return. Our team will guide you through the next steps.
            </li>
            <li className="return__list-item">
              <strong className="return__bold">Return Authorization: </strong>
              Once your return request is approved, you will receive a Return Authorization Number and instructions on how to return the item.
            </li>
            <li className="return__list-item">
              <strong className="return__bold">Pack & Ship: </strong>
              Pack the item securely in its original packaging and ship it to the provided address. Be sure to include the Return Authorization Number on the package.
            </li>
          </ul>
          <Line />
        </article>

        <article className="return__article">
          <h2 className="return__title-h2">Refunds</h2>
          <p className="return__text">After receiving your return and inspecting the condition of your item, we will process your return or exchange. Please allow 10 business days from the receipt of your item to process your return.</p>
          <p className="return__text">If your return is approved, we will initiate a refund to your original payment method. You will receive the credit within a certain amount of days, depending on your card issuer&aposs policies.</p>
          <Line />
        </article>

        <article className="return__article">
          <h2 className="return__title-h2">Exclusions</h2>
          <p className="return__text">Certain items, specific products or categories, may not be eligible for return due to hygiene or other reasons. Please check the product description for details.</p>
          <Line />
        </article>

        <article className="return__article">
          <h2 className="return__title-h2">Need Assistance?</h2>
          <p className="return__text">If you have any questions concerning our return policy, feel free to contact our customer service team. We are here to assist you and ensure your shopping experience.</p>
          <Line />
        </article>

        <p className="return__text-h3">Thank you for choosing us!</p>
      </div>
    </div>
  );
};
