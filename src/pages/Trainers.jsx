import axios from "axios";
import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { Trainer } from "../components/layout/trainer-parts/Trainer";
import { ModalChangeTrainer } from "../components/modal-windows/trainer-windows/ModalChangeTrainer";
import { ModalImageUpload } from "../components/modal-windows/trainer-windows/ModalImageUpload";
import { ImageUpload } from "../components/layout/trainer-parts/ImageUpload";
import { ModalAddTrainer } from "../components/modal-windows/trainer-windows/ModalAddTrainer";

const TRAINER_URL = "http://localhost:8080/api/trainer/";
const USER_URL = "http://localhost:8080/api/user/";

export const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [changed, setChanged] = useState(true);
  const [added, setAdded] = useState(true);
  const [role, setRole] = useState("STANDARD");
  const [modalActive, setModalActive] = useState(0);
  const [modalImageActive, setModalImageActive] = useState(false);
  const [modalAddTrainer, setModalAddTrainer] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [deleteOrUpdate, setDeleteOrUpdate] = useState(false);
  const [inputKey, setInputKey] = useState(null);
  const [trainerImageId, setTrainerImageId] = useState(0);
  const [formTrainer, setFormTrainer] = useState({
    username: null,
    priceForMonthTraining: null,
    priceForOneTraining: null,
    reviewValue: 0,
    telephone: null,
    dateOfBirthday: null,
  });

  const getTrainerById = async (id) => {
    await axios
      .get(`${TRAINER_URL}${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        setFormTrainer(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrainers = async () => {
    await axios
      .get(`${TRAINER_URL}all`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setTrainers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserRole = async () => {
    await axios
      .get(`${USER_URL}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data.memberships;
        if (data.includes("ROLE_ADMIN")) {
          setRole("ADMIN");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTrainer = async (id) => {
    await axios
      .put(
        `${TRAINER_URL}${id}`,
        { ...formTrainer },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setChanged(!changed);
        setDeleteOrUpdate(true);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setOpen(true);
      });
  };

  const deleteTrainer = async (id) => {
    await axios
      .delete(`${TRAINER_URL}${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const message = res.data.message;
        console.log(message);
        setChanged(!changed);
        setDeleteOrUpdate(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setOpen(true);
      });
  };

  const changeHandler = (event) => {
    setFormTrainer({ ...formTrainer, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setFormTrainer({});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const functionThatResetsTheFileInput = () => {
    let randomString = Math.random().toString(36);
    setInputKey(randomString);
  };

  useEffect(() => {
    getTrainers();
    getUserRole();
    setError(false);
  }, [changed, added]);

  return (
    <main className="main trainers">
      {trainers.map((trainer) => {
        return (
          <Trainer
            key={trainer.id}
            {...trainer}
            role={role}
            active={modalActive}
            setActive={setModalActive}
            activeImage={modalImageActive}
            setImageActive={setModalImageActive}
            setTrainerImageId={setTrainerImageId}
          ></Trainer>
        );
      })}
      {role === "ADMIN" && (
        <button
          className="add-trainer"
          onClick={() => setModalAddTrainer(true)}
        >
          + Add Trainer
        </button>
      )}
      <ModalChangeTrainer
        active={modalActive}
        setActive={setModalActive}
        getTrainerById={getTrainerById}
        clearForm={clearForm}
      >
        <form>
          <h1>{formTrainer.username}</h1>
          <input
            className="update-trainer-input"
            type="text"
            value={formTrainer.username === null ? "" : formTrainer.username}
            placeholder="username"
            name="username"
            onChange={changeHandler}
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={
              formTrainer.priceForOneTraining === null
                ? ""
                : formTrainer.priceForOneTraining
            }
            placeholder="Price For One Training"
            name="priceForOneTraining"
            onChange={changeHandler}
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={
              formTrainer.priceForMonthTraining === null
                ? ""
                : formTrainer.priceForMonthTraining
            }
            placeholder="Price For Month Training"
            name="priceForMonthTraining"
            onChange={changeHandler}
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={
              formTrainer.reviewValue === null ? "" : formTrainer.reviewValue
            }
            placeholder="Review Value"
            name="reviewValue"
            onChange={changeHandler}
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={formTrainer.telephone === null ? "" : formTrainer.telephone}
            placeholder="Telephone"
            name="telephone"
            onChange={changeHandler}
            required
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={
              formTrainer.dateOfBirthday === null
                ? ""
                : formTrainer.dateOfBirthday
            }
            placeholder="Date Of Birthday"
            name="dateOfBirthday"
            onChange={changeHandler}
          ></input>
        </form>
        <div className="change-buttons">
          <button
            className="update-trainers-button"
            onClick={() => {
              updateTrainer(formTrainer.id);
              setModalActive(0);
            }}
          >
            UPDATE
          </button>
          <button
            className="delete-trainers-button"
            onClick={() => {
              deleteTrainer(formTrainer.id);
              setModalActive(0);
            }}
          >
            DELETE
          </button>
        </div>
      </ModalChangeTrainer>
      <ModalImageUpload
        active={modalImageActive}
        setActive={setModalImageActive}
      >
        <ImageUpload
          active={modalImageActive}
          setActive={setModalImageActive}
          trainerImageId={trainerImageId}
          functionThatResetsTheFileInput={functionThatResetsTheFileInput}
          added={added}
          setAdded={setAdded}
          key={inputKey}
        ></ImageUpload>
      </ModalImageUpload>
      <ModalAddTrainer
        active={modalAddTrainer}
        setActive={setModalAddTrainer}
        added={added}
        setAdded={setAdded}
      ></ModalAddTrainer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {error ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {deleteOrUpdate
              ? "You have an error on updating this trainer. Please, correct input values!"
              : "You have an error on deleting this trainer!"}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {deleteOrUpdate
              ? "Trainer was successfully updated!"
              : "Trainer was successfully deleted"}
          </Alert>
        )}
      </Snackbar>
    </main>
  );
};
