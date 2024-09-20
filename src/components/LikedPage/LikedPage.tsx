import './LikedPage.scss';
import homeIcon from '../../imgs/Home.svg';
import arrowRight from '../../imgs/Chevron (Arrow Right).svg';
import { utils } from '../../utils/generalFunctions';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import heartEmpty from '../../imgs/Favourites.svg';
import heartFull from '../../imgs/Favourites Filled.svg';
import { LikedIdContext } from '../../utils/context';

export const LikedPage: React.FC = () => {
  const {
    addLikedId,
    removeLikedId,
    addCardId,
    removeCardId,
    cardIds,
    likedIds,
  } = useContext(LikedIdContext);
  const items = utils.findById(likedIds);

  const handleButtonCard = (id: string) => {
    if (cardIds.filter((cardId: string) => cardId === id).length === 1) {
      return removeCardId(id);
    }

    return addCardId(id);
  };

  const handleButtonHeart = (id: string) => {
    if (likedIds.filter((likedId: string) => likedId === id).length === 1) {
      return removeLikedId(id);
    }

    return addLikedId(id);
  };

  const isLiked = (id: string) => {
    return likedIds.filter((likedId: string) => likedId === id).length === 1;
  };

  const inCard = (id: string) => {
    return cardIds.filter((cardId: string) => cardId === id).length === 1;
  };

  return (
    <section className="liked">
      <div className="container">
        <div className="grid">
          <div className="homeHistory">
            <img src={homeIcon} alt="homeIcon" className="homeHistory_img" />
            <img
              src={arrowRight}
              alt="arrowRight"
              className="homeHistory_arrow"
            />
            <p className="homeHistory_text">Favourites</p>
          </div>

          <div className="liked_title">
            <p className="liked_title_text">Favourites</p>
            <p className="liked_title_items">{`${likedIds?.length} models`}</p>
          </div>
          <div className="items_catalog">
            <div className="items_catalog_container">
              {items.map((item, index) => (
                <div className="productCard" key={index}>
                  <div className="productCard_container">
                    <Link
                      to={`/${item.category}/${item.itemId}`}
                      className="productCard_container_link"
                    >
                      <div className="productCard_imgs">
                        <img
                          src={item.image}
                          className="productCard_imgs_img"
                          alt="IMG"
                        />
                      </div>

                      <p className="productCard_title">{item.name}</p>
                      <div className="productCard_prices">
                        <p className="productCard_price">{`$${item.price}`}</p>
                        <p className="productCard_fullPrice">{`$${item.fullPrice}`}</p>
                      </div>

                      <div className="productCard_info">
                        <div className="productCard_info_screen">
                          <p className="productCard_info_title">Screen</p>
                          <p className="productCard_info_text">{item.screen}</p>
                        </div>
                        <div className="productCard_info_capacity">
                          <p className="productCard_info_title">Capacity</p>
                          <p className="productCard_info_text">
                            {item.capacity}
                          </p>
                        </div>
                        <div className="productCard_info_ram">
                          <p className="productCard_info_title">Ram</p>
                          <p className="productCard_info_text">{item.ram}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="productCard_buttons">
                      <button
                        className="productCard_buttons_add"
                        onClick={() => handleButtonCard(item.itemId)}
                        style={{
                          backgroundColor: `${inCard(item.itemId) ? '#FAFBFC' : '#216CFF'}`,
                          color: `${inCard(item.itemId) ? '#216CFF' : '#FAFBFC'}`,
                          border: `${inCard(item.itemId) ? '1px solid #E2E6E9' : 'none'}`,
                        }}
                      >
                        {`${inCard(item.itemId) ? 'Added to Card' : 'Add to Card'}`}
                      </button>
                      <button
                        className="productCard_buttons_heart"
                        onClick={() => handleButtonHeart(item.itemId)}
                        style={{
                          backgroundImage: `${isLiked(item.itemId) ? `url('${heartFull}` : `url('${heartEmpty}`}')`,
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
