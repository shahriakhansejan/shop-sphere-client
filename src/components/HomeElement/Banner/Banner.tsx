import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

import banner1 from "../../../assets/images/banner/banner1.jpg"
import banner2 from "../../../assets/images/banner/banner2.jpg"
import banner3 from "../../../assets/images/banner/banner3.jpg"
import banner4 from "../../../assets/images/banner/banner4.jpg"
import banner5 from "../../../assets/images/banner/banner5.jpg"
import banner6 from "../../../assets/images/banner/banner6.jpg"
import BannerText from './BannerText';

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // navigation
        modules={[Autoplay, Navigation]}
        className="mySwiper"
        effect="flip"
        grabCursor={false}
        centeredSlides={true}
      >
        <SwiperSlide>
          <div
            className="text-start"
            style={{
              backgroundImage: `url(${banner1})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BannerText />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-start"
            style={{
              backgroundImage: `url(${banner2})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BannerText />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-start"
            style={{
              backgroundImage: `url(${banner3})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BannerText />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-start"
            style={{
              backgroundImage: `url(${banner6})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BannerText />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-start"
            style={{
              backgroundImage: `url(${banner4})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BannerText />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="text-start"
            style={{
              backgroundImage: `url(${banner5})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <BannerText />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
