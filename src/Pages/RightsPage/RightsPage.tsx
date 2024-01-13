/* eslint-disable max-len */
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Line } from '../../elements/Line/Line';
import './RightsPage.scss';

export const RightsPage = () => {
  return (
    <div className="rights">
      <Breadcrumbs page="rights & legal information" />

      <h1 className="rights__title">Rights & Legal Information</h1>

      <div className="rights__content">
        <article className="rights__article">
          <h2 className="rights__title-h2">Intellectual Property Rights</h2>
          <p className="rights__text">All content, designs, and intellectual property displayed here are the exclusive property. These materials are protected by applicable copyright and trademark laws. Unauthorized use, reproduction, or distribution of any content from this website is strictly prohibited.</p>
          <Line />
        </article>

        <article className="rights__article">
          <h2 className="rights__title-h2">User Submissions</h2>
          <p className="rights__text">By submitting any content, such as reviews, comments, or suggestions,you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media</p>
          <Line />
        </article>

        <article className="rights__article">
          <h2 className="rights__title-h2">Privacy & Data Protection</h2>
          <p className="rights__text">Your privacy is important to us. Our Privacy Policy outlines how we collect, use, and protect your personal information. By using our store, you consent to the practices described in our Privacy Policy</p>
          <Line />
        </article>

        <article className="rights__article">
          <h2 className="rights__title-h2">Governing Law</h2>
          <p className="rights__text">This website is governed by and construed in accordance with the laws.</p>
        </article>

        <p className="rights__text-h3">Thank you for choosing us!</p>
      </div>
    </div>
  );
};
