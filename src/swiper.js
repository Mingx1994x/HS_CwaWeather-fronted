import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
export const swiper = () => {
  return new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Autoplay],
    spaceBetween: 30,
    centeredSlides: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
}

