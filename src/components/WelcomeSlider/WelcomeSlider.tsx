import React, { useEffect, useRef, useState } from 'react';
import welcomeStyles from './WelcomeSlider.module.scss';
import topBatStyles from './TopBar.module.scss';
import iconStyles from './icon.module.scss';
import paginationStyle from './PaginationStyle.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import Sidebar from '../Sidebar';

import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const WelcomeSlider: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className={topBatStyles.header}>
        <div className={topBatStyles['top-bar']}>
          <a href="#" className={topBatStyles['top-bar__logo']}>
            <img
              src="public\img\gadgets-logo.png"
              alt="img-logo"
              className={topBatStyles['top-bar__logo-img']}
            />
          </a>

          <div className={topBatStyles['top-bar__icon-1']}>
            <a
              href="#burger-menu"
              className={`${iconStyles.icon} ${iconStyles['icon--menu']} ${topBatStyles['top-bar__icon--menu']}`}
              onClick={() => setIsMenuOpen(currentBoolean => !currentBoolean)}
            ></a>
          </div>
        </div>
      </div>
      <div className={welcomeStyles.header__title}>
        Welcome to Nice Gadgets store!
      </div>
      <Swiper
        className={welcomeStyles.swiper}
        modules={[Scrollbar, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: `.${paginationStyle.pagination}`,
          bulletClass: paginationStyle['swiper-custom-pagination-bullet'],
          bulletActiveClass:
            paginationStyle['swiper-custom-pagination-bullet--active'],
        }}
        scrollbar={{ draggable: true }}
        loop={true}
      >
        <SwiperSlide>
          <img
            src="public\img\Banner-mobile.5ab4e0f94787219dc791.png"
            alt="f"
            className={`${welcomeStyles['header__swiper-2']} ${welcomeStyles.header__swiper}`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="public\img\banner-mobil-3.88470ad4d90a78897a60.png"
            alt="f"
            className={`${welcomeStyles['header__swiper-0']} ${welcomeStyles.header__swiper}`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="public\img\banner-mobile-2.00d157dda3b7eb6a4ac1.png"
            alt="f"
            className={`${welcomeStyles['header__swiper-1']} ${welcomeStyles.header__swiper}`}
          />
        </SwiperSlide>
      </Swiper>
      <div className={paginationStyle.pagination}></div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam sed
      optio molestias, natus ipsum veritatis fugiat et dicta numquam praesentium
      quas amet labore reiciendis quis mollitia neque deleniti distinctio
      blanditiis asperiores, debitis voluptates hic nulla! Dignissimos veritatis
      suscipit soluta possimus, expedita architecto illum maiores pariatur,
      sequi maxime nulla fuga, at necessitatibus dolores temporibus quam aliquid
      facere omnis enim consectetur nisi consequatur mollitia sint illo! Alias
      reiciendis commodi assumenda corporis saepe id ipsa eligendi tempore,
      officia deserunt, esse quod ex. Iure dolor explicabo assumenda nobis
      maiores incidunt velit dignissimos expedita? Ducimus tempora nesciunt
      animi facilis impedit repudiandae suscipit temporibus! Iusto omnis saepe
      sint rem aliquam eaque magnam perspiciatis temporibus, voluptatem nesciunt
      quas assumenda quos corporis sed, possimus voluptas. Animi corporis
      excepturi esse facilis similique aspernatur aut itaque laudantium quod
      dolores? Vitae recusandae, animi dolores delectus repellendus et sunt,
      quis totam autem perspiciatis tempore officiis eum. Voluptates illum quae
      magni. Harum asperiores qui nemo molestias vitae doloribus labore nulla!
      Ad recusandae eos velit animi quo dolor vel quod, est sint eum facilis
      dicta inventore saepe laudantium quos atque eaque, laborum ipsum ab
      perferendis beatae ut perspiciatis! Autem non porro officia natus incidunt
      veniam. Fugit eius maxime officiis explicabo autem, consequuntur quaerat
      minus, obcaecati nemo distinctio fuga delectus ratione vel laudantium sit?
      Cumque esse ipsam eos eveniet id molestiae minus qui ratione nihil
      provident assumenda doloribus eligendi labore sit corporis quam iusto,
      ipsum alias. Labore sapiente excepturi in eum, ducimus similique totam
      veniam iusto quidem tempora deleniti, esse maiores expedita, fuga
      doloremque quo explicabo rem? Consequatur maxime dolorum nobis et
      voluptatibus, quibusdam illum maiores praesentium quos, placeat eos aut
      iusto dolores illo? Amet iure ipsum error impedit quae necessitatibus modi
      rerum aut tempore molestiae dolor esse quia numquam distinctio officia
      provident, corporis et est, vel veritatis! Ipsa, error. Quos ipsa labore
      repellat architecto, hic in eligendi doloribus fugiat non esse maiores.
      Quo quae iusto dicta eligendi earum vel eius cumque, porro nobis beatae
      sed et recusandae ab, saepe, obcaecati consequatur nihil velit ut!
      Laudantium quis eum voluptatum, eius consequuntur minima magni ab
      molestias, ex beatae dicta, sed dignissimos optio. Soluta sequi illum
      quaerat laboriosam debitis porro? Voluptates deleniti adipisci enim amet
      eum, officia earum placeat corporis accusantium ipsam quod ratione
      possimus dolorem quibusdam consequatur? Harum aliquid, aliquam ab
      accusamus eveniet praesentium non nobis soluta. Aperiam, iste ex sit
      tenetur laboriosam cum corporis deserunt omnis labore voluptates ratione,
      natus voluptatum accusamus dolorem explicabo esse quisquam at laudantium
      atque dolore cupiditate blanditiis facilis? Id, vel nobis. Quod autem ea
      quasi culpa laborum explicabo tenetur quibusdam qui sunt eum itaque facere
      eaque, voluptatibus perspiciatis ab quidem voluptatum temporibus id modi
      praesentium. Voluptas incidunt repudiandae necessitatibus eos iure.
      Doloremque aperiam facilis possimus voluptate, itaque illo, magnam,
      excepturi consectetur ducimus a nostrum sapiente rerum autem numquam earum
      nemo quibusdam nam facere natus tenetur iure porro? Quia consequuntur
      nobis voluptates debitis deleniti perspiciatis earum culpa autem minus vel
      minima labore rem, molestias similique temporibus molestiae necessitatibus
      quae. Cum debitis aliquid alias nam deserunt, soluta nisi esse odio
      dignissimos numquam aut, necessitatibus aperiam libero quidem facilis
      delectus omnis voluptatibus, sint veniam accusamus eligendi id architecto.
      Similique, vero iure aspernatur laboriosam doloremque provident
      perspiciatis suscipit dignissimos modi error beatae ab ducimus eos esse,
      assumenda voluptatem omnis! Delectus fugiat eum sequi maiores aspernatur
      modi qui reprehenderit. Nemo commodi quis quia, ipsa error eius? Maiores
      reiciendis explicabo aut odio optio iusto. Iste dolore vero dolorem quidem
      maiores in officiis voluptates earum reprehenderit blanditiis magnam,
      molestiae cumque error dignissimos facilis non perspiciatis enim, laborum,
      mollitia exercitationem repellendus eligendi. Voluptate quia quam pariatur
      corporis qui, doloribus nesciunt animi sit nulla veniam inventore
      provident laudantium expedita ratione dicta tempore, officia ab earum
      sequi. Corporis sint qui aliquid obcaecati quas aperiam maxime dolorem
      doloremque esse velit commodi sed repellat similique quae voluptas sequi,
      et nesciunt, accusamus mollitia eius officiis assumenda a nulla odio!
      Commodi ipsam dolorem, omnis quidem ratione facere blanditiis beatae
      soluta, nemo nihil fugiat consectetur natus praesentium neque excepturi
      quae voluptatibus nulla eius magnam officia adipisci sapiente corporis
      distinctio aspernatur! Et quod omnis obcaecati eligendi quasi maxime,
      magnam ratione voluptatum recusandae reiciendis magni nemo consequuntur
      tempore tenetur fugiat minus optio eum veritatis iste nihil corporis. Illo
      corrupti praesentium assumenda deserunt pariatur, magni totam autem
      distinctio blanditiis nulla cum perferendis voluptatum facilis consequatur
      at atque laboriosam aperiam omnis corporis fugit, excepturi nesciunt
      labore? Voluptates recusandae qui laborum explicabo eum libero illo beatae
      a iure optio, blanditiis ipsam ad ratione consequatur cupiditate dolorem
      corporis. Voluptate minima deserunt tempora odit, mollitia harum
      accusantium voluptatibus vitae eius voluptates vero officia repudiandae
      reprehenderit velit natus autem earum placeat delectus necessitatibus
      eligendi porro sequi. Sequi, velit nam fuga vitae beatae molestias rem
      unde, aliquam neque minima quam provident in eos iste. Dolor quae iusto
      eos illum magni provident, sed officia. Odit autem ratione quibusdam
      omnis, pariatur dolore ipsa reprehenderit ab vitae dolor doloremque
      voluptatibus error dignissimos architecto dolores provident, fuga natus
      sapiente facilis minima accusantium! Labore nobis ab non expedita
      voluptatem dolor explicabo quis obcaecati omnis saepe, similique aut amet
      unde porro vero voluptate deleniti maiores? Accusamus earum nobis tempore
      debitis omnis ex illo est sed dolore voluptatum aliquam eligendi unde
      saepe ducimus delectus aperiam harum, tenetur accusantium incidunt libero
      ipsa. Quia praesentium, harum minus veniam, voluptates eos perspiciatis
      provident autem quod tempora repellat, quos vel. Magni nemo molestias
      provident laboriosam voluptas consectetur necessitatibus! Dicta temporibus
      ex exercitationem repudiandae, repellendus culpa qui nulla expedita
      necessitatibus deleniti amet molestias! Ratione consequuntur cumque sit
      ullam. Nesciunt nulla doloribus maiores iusto hic delectus voluptas
      adipisci nihil temporibus! Repellendus aperiam similique aut vero
      doloremque placeat, nesciunt autem est itaque amet molestiae ullam nisi
      provident earum optio reprehenderit eius hic soluta. Necessitatibus
      quibusdam excepturi similique error possimus doloremque blanditiis quidem
      cumque perferendis nam ea, quos dolores deserunt obcaecati nisi, aliquam
      sunt ut fugiat architecto animi alias fugit nulla atque? Veritatis
      doloremque voluptatibus cumque ipsum natus iure voluptatem dignissimos
      facere, veniam recusandae perferendis tenetur autem cum molestias quia
      quas quaerat ea consectetur. Eos, sit voluptate. Aspernatur dignissimos,
      voluptatem eos quo at minima aperiam harum nihil sint dolorem?
      <Sidebar isOpen={isMenuOpen} />
    </div>
  );
};

export default WelcomeSlider;
