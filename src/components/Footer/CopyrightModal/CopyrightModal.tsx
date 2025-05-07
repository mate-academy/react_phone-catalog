import { useEffect } from 'react';
import style from './CopyrightModal.module.scss';
import classNames from 'classnames';
type Props = {
  toggleModal: () => void;
};
export const CopyrightModal: React.FC<Props> = ({ toggleModal }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div className={style.copyright_container}>
      <div className={style.modal_overlay}>
        <div className={style.modal_content}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Copyright Notice
          </h2>

          <p>© 2024 Seva Podolskiy’s Web Studio. All Rights Reserved.</p>

          <p>
            This website and its content, including but not limited to text,
            images, graphics, logos, icons, and design elements, are the
            exclusive property of Seva Podolskiy’s Web Studio. Unauthorized use,
            duplication, reproduction, distribution, or modification of any
            content on this site is strictly prohibited without prior written
            consent.
          </p>

          <h3>Permitted Uses:</h3>

          <ul>
            <li>Personal, non-commercial viewing of the website content.</li>
            <li>
              Sharing content via social media platforms with proper credit and
              a direct link to this website.
            </li>
          </ul>

          <h3>Prohibited Uses:</h3>

          <ul>
            <li>Republishing material from this site without attribution.</li>
            <li>Utilizing website content for commercial purposes.</li>
            <li>
              Using automated tools to scrape or extract data without written
              authorization.
            </li>
          </ul>

          <p>
            Seva Podolskiy’s Web Studio respects intellectual property rights
            and expects visitors to do the same. If you believe any content on
            this site infringes on your copyright, please contact us immediately
            at{' '}
            <a href="mailto:copyright@sevapodolskiywebstudio.com">
              copyright@sevawebstudio.com
            </a>
            .
          </p>

          <p>
            This copyright notice is subject to change without notice. By using
            this website, you agree to comply with these terms and respect all
            applicable copyright laws.
          </p>

          <p>
            Thank you for visiting and respecting the intellectual property on
            this website!
          </p>

          <div className={style.button_wrap}>
            <div
              className={classNames('buttons_container', style.button)}
              onClick={toggleModal}
            >
              <div className="buttons_text">Close</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
