import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Buttons } from '../../components/Buttons';
import { Loader } from '../../components/Loader';
import { Notification } from '../../components/Notification';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Device } from '../../types/Device';
import { getTargetDevice } from '../../utils/getDevicesFromApi';
import { PhoneContext } from '../../utils/PhoneContext';

export const TargetPhone: React.FC = () => {
  const { deviceId = '' } = useParams();
  const [targetPhone, setTargetPhone] = useState<Device | null>(null);
  const [targetImg, setTargetImg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isAddCart,
    isAddFav,
    bagPhones,
    addToBag,
    favPhones,
    addAndRemove,
    phoneList,
  } = useContext(PhoneContext);

  const fetchProducts = async (id: string) => {
    setIsLoading(true);
    const res = await getTargetDevice(id);

    try {
      setTargetPhone(res);
      // setIsShowError(false);
    } catch (error) {
      // setIsShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(deviceId);
  }, [deviceId]);

  useEffect(() => {
    setTargetImg(targetPhone?.images[0] || '');
  }, [targetPhone]);

  const phone = phoneList.find(item => item.phoneId === targetPhone?.id);
  const url = `/phones/${targetPhone?.namespaceId}`;
  const capacity = targetPhone?.capacity.toLowerCase();
  const color = targetPhone?.color;

  console.log(targetImg);

  const getColor = (colorPhone: string) => {
    switch (colorPhone) {
      case 'spacegray':
        return 'gray';

      case 'midnightgreen':
        return 'darkolivegreen';

      case 'rosegold':
        return 'rosybrown';

      default:
        return colorPhone;
    }
  };

  return (
    <>
      {isLoading && (
        <div className="TargetPhone_loader">
          <Loader />
        </div>
      )}
      {!isLoading && targetPhone && (
        <div className="TargetPhone">
          {isAddCart && (
            <Notification title="Succes" text="Was added to shopping cart" />
          )}
          {isAddFav && (
            <Notification title="Succes" text="Was added to favorites" />
          )}
          <nav className="TargetPhone_navigation">
            <Link to="/home" className="TargetPhone_navigation_home" />
            <span className="TargetPhone_navigation_text">
              {'>'}
            </span>
            <Link
              to="/phones"
              className="TargetPhone_navigation_link"
            >
              Phones
            </Link>
            <span className="TargetPhone_navigation_text">
              {'>'}
            </span>
            <span className="TargetPhone_navigation_text">
              {targetPhone.name}
            </span>
          </nav>

          <Link
            to="/phones"
            className="TargetPhone_back"
          >
            {'<  Back'}
          </Link>

          <div className="TargetPhone_conteiner">
            <h1 className="TargetPhone_conteiner_title">
              {targetPhone.name}
            </h1>
            <div className="TargetPhone_conteiner_top">
              <div className="TargetPhone_conteiner_top_smallImg">
                {targetPhone.images.map(img => (
                  <button
                    type="button"
                    key={img}
                    onClick={() => setTargetImg(img)}
                    className={classNames(
                      'TargetPhone_conteiner_top_smallImg_box', {
                        'TargetPhone_conteiner_top_smallImg_box-active':
                        targetImg === img,
                      },
                    )}
                  >
                    <img
                      className="TargetPhone_conteiner_top_smallImg_box_img"
                      src={img}
                      alt="img"
                    />
                  </button>
                ))}
              </div>

              <div className="TargetPhone_conteiner_top_bigImg">
                <img
                  src={targetImg}
                  alt="bigImg"
                  className="TargetPhone_conteiner_top_bigImg_img"
                />
              </div>

              <div className="change">
                <div className="change_color">
                  <span className="change_color_text">
                    Available colors
                  </span>
                  <div className="change_color_box">
                    {targetPhone.colorsAvailable.map(col => (
                      <div
                        key={col}
                        className={classNames(
                          'change_color_box_item', {
                            'color-active': targetPhone.color === col,
                          },
                        )}
                      >
                        <Link
                          to={`${url}-${capacity}-${col}`}
                          style={{ backgroundColor: `${getColor(col)}` }}
                          className="change_color_box_item_link"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="change_capacity">
                  <span
                    className="change_capacity_title"
                  >
                    Select capacity
                  </span>

                  <div className="change_capacity_box">
                    {targetPhone.capacityAvailable.map(cap => (
                      <Link
                        to={`${url}-${cap.toLowerCase()}-${color}`}
                        key={cap}
                        type="button"
                        className={classNames(
                          'change_capacity_box_cop', {
                            'copacity-active': targetPhone.capacity === cap,
                          },
                        )}
                      >
                        {cap}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="change_price">
                  <span className="change_price_actual">
                    {`$${targetPhone.priceDiscount}`}
                  </span>
                  <span className="change_price_full">
                    {`$${targetPhone.priceRegular}`}
                  </span>
                </div>

                {phone && (
                  <Buttons
                    addToBag={() => addToBag(phone)}
                    boolVal={bagPhones.some(
                      dev => dev.phoneId === phone.phoneId,
                    )}
                    addAndRemove={() => addAndRemove(phone)}
                    favBool={
                      favPhones.some(dev => dev.phoneId === phone.phoneId)
                    }
                  />
                )}

                <div className="change_about">
                  <div className="change_about_text">
                    <span className="change_about_text_title">
                      Screen
                    </span>
                    <span className="change_about_text_value">
                      {targetPhone.screen}
                    </span>
                  </div>
                  <div className="change_about_text">
                    <span className="change_about_text_title">
                      Resolution
                    </span>
                    <span className="change_about_text_value">
                      {targetPhone.resolution}
                    </span>
                  </div>
                  <div className="change_about_text">
                    <span className="change_about_text_title">
                      Processor
                    </span>
                    <span className="change_about_text_value">
                      {targetPhone.processor}
                    </span>
                  </div>
                  <div className="change_about_text">
                    <span className="change_about_text_title">
                      RAM
                    </span>
                    <span className="change_about_text_value">
                      {targetPhone.ram}
                    </span>
                  </div>
                </div>
              </div>
              <span className="id">
                ID: 802390
              </span>
            </div>
          </div>

          <div className="TargetPhone_description">
            <div className="TargetPhone_description_about">
              <h1 className="TargetPhone_description_about_title">
                About
              </h1>

              <div className="TargetPhone_description_about_conteiner">
                {targetPhone.description.map(desc => (
                  <div
                    key={desc.title}
                    className="TargetPhone_description_about_text"
                  >
                    <h2 className="TargetPhone_description_about_text_title">
                      {desc.title}
                    </h2>
                    <span className="
                      TargetPhone_description_about_text_paragraph"
                    >
                      {desc.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="TargetPhone_description_specs">
              <h1 className="TargetPhone_description_specs_title">
                Tech specs
              </h1>

              <div className="TargetPhone_description_specs_conteiner">
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Screen
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.screen}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Resolution
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.resolution}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Processor
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.processor}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    RAM
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.ram}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Built in memory
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.capacity}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Camera
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.camera}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Zoom
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.zoom}
                  </span>
                </div>
                <div className="TargetPhone_description_specs_conteiner_items">
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_title"
                  >
                    Cell
                  </span>
                  <span
                    className="
                      TargetPhone_description_specs_conteiner_items_text"
                  >
                    {targetPhone.cell.map(c => (
                      <span key={c}>
                        {`${c}, `}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ProductsSlider
              phoneList={phoneList}
              title="You may also like"
            />
          </div>
        </div>
      )}
    </>
  );
};
