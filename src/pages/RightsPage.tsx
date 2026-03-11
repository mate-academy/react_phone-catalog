import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../utils/asset';
import styles from './pages.module.scss';

export const RightsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        <img
          src={getAssetUrl('img/Chevron%20(Arrow%20Right).png')}
          alt=""
          className={styles.arrowRight}
        />
        Back
      </button>

      <h1 className={styles.policyTitle}>Welcome to Nice Gadgets store!</h1>
      <p className={styles.policyIntro}>
        By using this website, you agree to the following terms and policies.
        Please read them carefully before using the site.
      </p>

      <ol className={styles.policyList}>
        <li>
          <strong>Ownership and Copyright</strong>
          <p>
            All materials posted on the site, including text, graphics, images,
            logos, design, software, trademarks, domain names and other content
            elements, are the property of JS Ninjas team and are protected by
            copyright and intellectual property laws.
          </p>
        </li>
        <li>
          <strong>Use of materials</strong>
          <p>
            You have the right to view, download or print materials from the
            website only for personal, non-commercial use. All other forms of
            use of materials, including copying, distribution, publication or
            sale, are prohibited without prior written consent.
          </p>
        </li>
        <li>
          <strong>Copy protection</strong>
          <p>
            The materials on this site are protected from unauthorized copying.
            The use of automatic scripts, bots or other means to collect or copy
            materials without permission is a violation of the terms of use.
          </p>
        </li>
        <li>
          <strong>Privacy Policy</strong>
          <p>
            We care about your privacy. We do not use or store any of your
            Personal Data on the website, except for data about orders and
            favourite products on this website.
          </p>
        </li>
        <li>
          <strong>Changes and Updates</strong>
          <p>
            We reserve the right to change or update these terms at any time.
            Any changes will be effective upon posting on the site. We recommend
            that you periodically review these terms to stay informed of any
            changes.
          </p>
        </li>
        <li>
          <strong>Liability</strong>
          <p>
            We are not responsible for any losses or damages that may arise from
            the use of our site. Use of the site is at your own discretion and
            risk.
          </p>
        </li>
        <li>
          <strong>Contact Us</strong>
          <p>
            If you have any questions or comments regarding these terms, please
            feel free to contact us. You can find team contacts on Contacts
            page.
          </p>
        </li>
      </ol>
    </div>
  );
};
