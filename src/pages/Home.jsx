import logo from "../assets/06b92953cb92f01d1b9f5e27e1e7c8e5.jpeg";
import logoPortfolio1 from "../assets/gym-fitness-club-with-yellow-black-design_258219-321.jpg.webp";
import logoPortfolio2 from "../assets/gym-fitness-club-with-yellow-wall_258219-308.jpg.webp";
import logoPortfolio4 from "../assets/62e9e114e2af4.jpeg";
import logoPortfolio5 from "../assets/l-MyDesktop-4726068-17.jpeg";
import trainers from "../assets/anatomy37-gym.jpeg";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Controller } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Home = () => {
  // eslint-disable-next-line
  const [controlledSwiper, setControlledSwiper] = useState(null);
  return (
    <main className="main">
      <section className="about section" id="about">
        <img src={logo} alt="" className="about__img" />
        <h2 className="section__title">TrainMe App</h2>
        <span className="section__subtitle">About us</span>

        <div className="about__container">
          <div className="about__data">
            <p className="about__description" style={{ fontSize: "18px" }}>
              TrainMe App - is a unique concept with several sports sectors
              under one roof.
            </p>
            <p className="about_info-title" style={{ fontSize: "18px" }}>
              On an area of 800 m2, we offer clients facilities for functional
              training, calisthenics or exercises with their own body weight,
              fitness and cardio zone, stretching zone, aerobic activities,
              weightlifting & powerlifting zone, strongman accessories and a new
              separate multifunctional hall with a projector and equipment for
              combat sports. Spacious bar with pleasant service, where you will
              be able to choose from a wide range of nutritional supplements and
              drinks and The Associated comfortable seating with good coffee.
            </p>
            <section
              className="portfolio section"
              id="portfolio"
              style={{ paddingTop: "10rem", paddingBottom: "2rem" }}
            >
              <div className="portfolio__container container swiper">
                <div className="swiper-wrapper">
                  <Swiper
                    modules={[
                      Navigation,
                      Pagination,
                      Scrollbar,
                      A11y,
                      Controller,
                    ]}
                    controller={{ control: controlledSwiper }}
                    spaceBetween={250}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    style={{ width: "100%" }}
                  >
                    <SwiperSlide style={{ width: "100%" }}>
                      <div className="portfolio__content grid swiper-slide">
                        <img
                          src={logoPortfolio1}
                          alt=""
                          className="portfolio__img"
                        />
                        <div className="portfolio__data"></div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="portfolio__content grid swiper-slide">
                        <img
                          src={logoPortfolio2}
                          alt=""
                          className="portfolio__img"
                        />
                        <div className="portfolio__data"></div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="portfolio__content grid swiper-slide">
                        <img
                          src={logoPortfolio4}
                          alt=""
                          className="portfolio__img"
                        />
                        <div className="portfolio__data"></div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="portfolio__content grid swiper-slide">
                        <img
                          src={logoPortfolio5}
                          alt=""
                          className="portfolio__img"
                        />
                        <div className="portfolio__data"></div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </section>
            <div className="about__info" style={{ paddingTop: "5rem" }}>
              <div>
                <p className="about_info-title" style={{ fontSize: "18px" }}>
                  We are a complex Sports Center with a friendly atmosphere in
                  Prague operating since 2022.
                </p>
                <p
                  className="about_info-title"
                  style={{ fontSize: "18px", paddingTop: "3rem" }}
                >
                  We have replaced binding contractual obligations with a
                  non-binding payment.
                </p>
                <p
                  className="about_info-title"
                  style={{ fontSize: "18px", paddingTop: "3rem" }}
                >
                  We prefer quality over quantity, we focus not only on the
                  education of the general public, children but also athletes
                  and coaches of various industries in the form of seminars,
                  courses and in cooperation with the best educational centers
                  in the Czech Republic.
                </p>
                <p
                  className="about_info-title"
                  style={{ fontSize: "18px", paddingTop: "3rem" }}
                >
                  We are a functional, exceptionally equipped gym and offer our
                  clients trained trainers for comprehensive sports care.
                </p>
                <p
                  className="about_info-title"
                  style={{ fontSize: "18px", paddingTop: "3rem" }}
                >
                  Here you will find not only you, experienced athletes, but
                  also everyone else who comes to work out, relax from everyday
                  worries, to spend their free time usefully.
                </p>
                <p
                  className="about_info-title"
                  style={{ fontSize: "18px", paddingTop: "3rem" }}
                >
                  We believe that you will spend many good moments in the new
                  center and that your determination and motivation to exercise
                  regularly will meet with your personal success. To do this, we
                  wish you every success.
                </p>
                <p
                  className="about_info-title"
                  style={{
                    fontSize: "18px",
                    paddingTop: "5rem",
                    paddingBottom: "2rem",
                  }}
                ></p>
                <span className="about__info-title">Our big pleasure team</span>
                <img src={trainers} alt="" className="about__img" />
                <span className="about__info-title">More Than 10+</span>
                <span className="about__info-name">
                  Experienced Professional Trainers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
