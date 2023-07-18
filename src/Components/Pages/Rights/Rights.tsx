/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import './Rights.scss';
import HomeImage from './RightsImage/Home.svg';
import Arrowimage from './RightsImage/Arrow.svg';
import MA from './RightsImage/MA.png';

export const Rights = () => {
  const rightsData = [
    {
      id: 1,
      text:
        `Copyright: The website owner holds the copyrights to the content displayed on the site,
         including text, images, graphics, etc. Users of the website are expected to respect these 
         rights and not use the materials without permission or in violation of specified usage conditions.`,
    },
    {
      id: 2,
      text: `License to Use: The website owner may grant users a limited license to access and view the content
       on the site. Users are expected to comply with the terms of this license and not infringe upon the owner^s rights.`,
    },
    {
      id: 3,
      text: `Prohibition of Unlawful Activities: Users may be prohibited from using the website for unlawful purposes,
       such as posting illegal content, infringing on the copyrights of others, distributing malware, etc.`,
    },

    {
      id: 4,
      text: `Limitation of Liability: The website owner may limit their liability for any losses or damages incurred
       by users as a result of using the site. This could include disclaimers for errors, inaccuracies,
        or incomplete content on the site.`,
    },

    {
      id: 5,
      text: `User Comments and Interactions: If the website allows users to leave comments or interact with others,
       there may be specific rules governing such activities. For example, prohibitions on offensive or unlawful behavior,
        moderation of comments, etc.`,
    },

    {
      id: 6,
      text: `Protection of Personal Data: The website owner must comply with applicable laws regarding
       the protection of personal data if they collect and process users' personal information.
        Users should be provided with informed consent regarding the collection and use of their data.`,

    },

    {
      id: 7,
      text: `User Responsibilities: Users may be required to comply with certain responsibilities when using 
      the website, such as providing accurate information, maintaining the confidentiality of their account 
      credentials, and not engaging in activities that may disrupt or harm the website or other users.`,

    },

    {
      id: 8,
      text: `Intellectual Property: Users are expected to respect the intellectual property rights of
       the website owner and other third parties. This includes refraining from copying, distributing, or modifying copyrighted materials without proper authorization.`,

    },

    {
      id: 9,
      text: `Third-Party Links: The website may contain links to third-party websites or resources. The terms of use may clarify that the website owner is not responsible
       for the availability, content, or accuracy of these external sites and that users access them at their own risk.`,

    },

    {
      id: 10,
      text: `Termination: The terms may specify conditions under which the website owner can terminate a user's access to the site,
       such as for violations of the terms of use or illegal activities.`,

    },

    {
      id: 11,
      text: `Dispute Resolution: Procedures for resolving disputes between the website owner and users may be outlined,
       such as through arbitration, mediation, or litigation in a specific jurisdiction.`,

    },

    {
      id: 12,
      text: `Modifications to the Terms: The website owner reserves the right to modify the terms of use at any time.
       Users may be notified of such changes, and their continued use of the website may be considered acceptance of the updated terms.`,

    },
  ];

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

        <p className="block-forPageNotFound__text-1">Rights</p>
      </div>
      <h1 className="Rights__title">Rights</h1>

      <div className="allBlockForRights">

        {rightsData.map((data, index) => (
          <>
            <p className="allBlockForRights__text" key={index}>{data.text}</p>
          </>
        ))}
      </div>
      <div className="container-forMAImage">
        <a href="https://mate.academy/?utm_source=google&utm_medium=cpc&utm_term=mate%20academy&utm_content=587604768452&utm_campaign=gs_brand_ua_mxd&gad=1&gclid=Cj0KCQjwwISlBhD6ARIsAESAmp7eVCkNplE2P2gQjDFSPvDt2uSGx4E5BciMeUKAYJpsbDGX2PJp7fgaAqzOEALw_wcB">
          <img className="MAImage" src={MA} alt="" />
        </a>
      </div>
    </>
  );
};
