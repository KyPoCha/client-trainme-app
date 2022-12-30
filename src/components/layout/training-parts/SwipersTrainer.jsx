import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Controller } from "swiper";
import axios from "axios";
import { Trainer } from "../trainer-parts/Trainer";
import { TRAINER_URL } from "../../../API_CONSTANTS";

export const SwipersTrainer = ({ setTrainerId, setTrainerUsername }) => {
  const [trainers, setTrainers] = useState([]);
  const isSwiper = true;
  // eslint-disable-next-line
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const getTrainers = async () => {
    await axios
      .get(`${TRAINER_URL}all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        setTrainers(
          data.filter(
            (trainer) =>
              trainer.priceForOneTraining !== null ||
              trainer.priceForMonthTraining !== null
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
      controller={{ control: controlledSwiper }}
      spaceBetween={100}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      style={{ width: "50%" }}
    >
      {trainers.map((trainer) => {
        return (
          <SwiperSlide
            key={trainer.id}
            style={{ width: "100%" }}
            virtualIndex={trainer.id}
            itemID={trainer.id}
          >
            <Trainer
              key={trainer.id}
              {...trainer}
              isSwiper={isSwiper}
              setTrainerId={setTrainerId}
              setTrainerUsername={setTrainerUsername}
            ></Trainer>
            ;
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
