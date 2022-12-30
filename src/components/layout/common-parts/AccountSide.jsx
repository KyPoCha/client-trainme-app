import { Link } from "react-router-dom";
import { NearestTraining } from "../training-parts/NearestTraining";
import { ProfilePart } from "./ProfilePart";
import axios from "axios";
import { useState, useEffect } from "react";
import { Trainer } from "../trainer-parts/Trainer";
import { TRAINER_URL, TRAINING_URL } from "../../../API_CONSTANTS";

export const AccountSide = ({ updated }) => {
  const [resCode, setResCode] = useState();
  const [training, setTraining] = useState({
    id: 0,
    place: "",
    timeTo: "",
    timeFrom: "",
    trainerUsername: "",
  });
  const [trainer, setTrainer] = useState({
    id: 0,
    username: null,
    reviewValue: 0,
    email: null,
    telephone: null,
    priceForOneTraining: null,
    priceForMonthTraining: null,
    dateOfBirthday: null,
  });

  const getTraining = async () => {
    await axios
      .get(`${TRAINING_URL}nearest`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        setTraining(data);
      })
      .catch((err) => {
        console.log(err);
        setResCode(err.code);
      });
  };

  const getBestTrainer = async () => {
    await axios
      .get(`${TRAINER_URL}theBest`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        setTrainer(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTraining();
    getBestTrainer();
  }, [updated]);

  return (
    <div className="right">
      <ProfilePart></ProfilePart>

      <div className="sales-analytics">
        {resCode === "ERR_BAD_REQUEST" ? (
          <h1>You don't have any trainings yet</h1>
        ) : (
          <>
            <h1>The nearest trainings</h1>
            <NearestTraining training={training}></NearestTraining>
          </>
        )}
        <div className="item add-training">
          <Link to="/add">
            <div>
              <span className="material-symbols-sharp">add</span>
              <h3>Add Training</h3>
            </div>
          </Link>
        </div>
        <h1>The Best Trainer</h1>
        <Trainer id={trainer.id} {...trainer}></Trainer>
      </div>
    </div>
  );
};
