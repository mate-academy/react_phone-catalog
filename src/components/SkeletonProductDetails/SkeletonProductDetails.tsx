import classNames from 'classnames';
import s from './SkeletonProductDetails.module.scss';

export const SkeletonProductDetails = () => {
  return (
    <div className={s.skeletonProductDetails}>
      <div className={s.breadcrumbs}>
        <div className={classNames(s.homeLink, s.skeleton)} />
        <div className={s.arrowRight} />
        <span className={s.skeleton}>Phones</span>
        <div className={s.arrowRight} />
        <span className={classNames(s.productName, s.skeleton)}>
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </span>
      </div>

      <div className={classNames(s.btnBack, s.skeleton)}>Go Back</div>

      <div className={classNames(s.title, s.skeleton)}>
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </div>

      <div className={s.detailsContent}>
        <div className={s.mainImgWrapper}>
          <div className={classNames(s.mainImg, s.skeleton)} />
        </div>

        <div className={s.availableImages}>
          <div className={classNames(s.imgRadio, s.skeleton)} />
          <div className={classNames(s.imgRadio, s.skeleton)} />
          <div className={classNames(s.imgRadio, s.skeleton)} />
          <div className={classNames(s.imgRadio, s.skeleton)} />
          <div className={classNames(s.imgRadio, s.skeleton)} />
        </div>

        <div className={s.features}>
          <div className={s.availableColorsWrapper}>
            <div className={s.colorsTopInfo}>
              <p className={classNames(s.featuresLabel, s.skeleton)}>
                Available colors
              </p>
              <span className={classNames(s.id, s.skeleton)}>ID: 802390</span>
            </div>

            <div className={s.availableColors}>
              <div className={classNames(s.colorRadio, s.skeleton)} />
              <div className={classNames(s.colorRadio, s.skeleton)} />
              <div className={classNames(s.colorRadio, s.skeleton)} />
              <div className={classNames(s.colorRadio, s.skeleton)} />
            </div>
          </div>

          <div className={s.availableCapacitiesWrapper}>
            <p className={classNames(s.featuresLabel, s.skeleton)}>
              Select capacity
            </p>

            <div className={s.availableCapacities}>
              <div className={classNames(s.capacityRadio, s.skeleton)}>
                64 GB
              </div>
              <div className={classNames(s.capacityRadio, s.skeleton)}>
                256 GB
              </div>
              <div className={classNames(s.capacityRadio, s.skeleton)}>
                512 GB
              </div>
            </div>
          </div>

          <div className={s.priceWrapper}>
            <p className={classNames(s.priceRegular, s.skeleton)}>$799</p>
            <p className={classNames(s.priceDiscount, s.skeleton)}>$1199</p>
          </div>

          <div className={s.addButtons}>
            <div className={classNames(s.cartBtn, s.skeleton)} />
            <div className={classNames(s.heartBtn, s.skeleton)} />
          </div>

          <table className={s.featuresTable}>
            <tbody className={s.featuresTbody}>
              <tr className={s.featuresRow}>
                <td className={classNames(s.featuresCell, s.skeleton)}>
                  Screen
                </td>
                <td className={classNames(s.featuresCell, s.skeleton)}>
                  6.5” OLED
                </td>
              </tr>
              <tr className={s.featuresRow}>
                <td className={classNames(s.featuresCell, s.skeleton)}>
                  Resolution
                </td>
                <td className={classNames(s.featuresCell, s.skeleton)}>
                  2688x1242
                </td>
              </tr>
              <tr className={s.featuresRow}>
                <td className={classNames(s.featuresCell, s.skeleton)}>
                  Processor
                </td>
                <td className={classNames(s.featuresCell, s.skeleton)}>
                  Apple A12 Bionic
                </td>
              </tr>
              <tr className={s.featuresRow}>
                <td className={classNames(s.featuresCell, s.skeleton)}>RAM</td>
                <td className={classNames(s.featuresCell, s.skeleton)}>3 GB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.aboutTechSpecsContent}>
        <div className={s.aboutSection}>
          <p className={classNames(s.aboutLabel, s.skeleton)}>About</p>

          <div className={s.descriptionsWrapper}>
            <div>
              <p className={classNames(s.descriptionTitle, s.skeleton)}>
                And then there was Pro
              </p>
              <p className={classNames(s.descriptionTxt, s.skeleton)}>
                A transformative triple-camera system that adds tons of
                capability without complexity.
                <br />
                <br />
                An unprecedented leap in battery life. And a mind-blowing chip
                that doubles down on machine learning and pushes the boundaries
                of what a smartphone can do. Welcome to the first iPhone
                powerful enough to be called Pro.
              </p>
            </div>

            <div>
              <p className={classNames(s.descriptionTitle, s.skeleton)}>
                Camera
              </p>
              <p className={classNames(s.descriptionTxt, s.skeleton)}>
                Meet the first triple-camera system to combine cutting-edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest-quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </div>

            <div>
              <p className={classNames(s.descriptionTitle, s.skeleton)}>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </p>
              <p className={classNames(s.descriptionTxt, s.skeleton)}>
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </div>
          </div>
        </div>

        <div className={s.techSpecsSection}>
          <p className={classNames(s.techSpecsLabel, s.skeleton)}>Tech specs</p>

          <table className={s.techSpecsTable}>
            <tbody className={s.techSpecsTbody}>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Screen
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  6.5” OLED
                </td>
              </tr>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Resolution
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  2688x1242
                </td>
              </tr>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Processor
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Apple A12 Bionic
                </td>
              </tr>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>RAM</td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  3 GB
                </td>
              </tr>

              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Built in memory
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  64 GB
                </td>
              </tr>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Camera
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  12 Mp + 12 Mp + 12 Mp (Triple)
                </td>
              </tr>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Zoom
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Optical, 2x
                </td>
              </tr>
              <tr className={s.techSpecsRow}>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  Cell
                </td>
                <td className={classNames(s.techSpecsCell, s.skeleton)}>
                  GSM, LTE, UMTS
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
