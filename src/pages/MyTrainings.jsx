import { useState } from "react";
import { Calendar } from "react-calendar";
import { ModalChangeTraining } from "../components/modal-windows/training-windows/ModalChangeTraining";
import { Trainings } from "../components/layout/training-parts/Trainings";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { TRAINING_URL } from "../API_CONSTANTS";

export const MyTrainings = ({ setUpdated, updated }) => {
  const [checked, setChecked] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [changed, setChanged] = useState(true);
  const [deleteOrUpdate, setDeleteOrUpdate] = useState(true);
  const [date, setDate] = useState(new Date());
  const [formTraining, setFormTraining] = useState({
    id: 0,
    place: null,
    timeTo: null,
    timeFrom: null,
    trainerUsername: null,
  });

  const formatDate = () => {
    const newDate = date.toISOString().split("T")[0];
    const timeStart = newDate + "T" + formTraining.timeFrom;
    const timeEnd = newDate + "T" + formTraining.timeTo;
    setFormTraining({
      id: formTraining.id,
      place: formTraining.place,
      timeFrom: timeStart,
      timeTo: timeEnd,
      trainerUsername: formTraining.trainerUsername,
    });
  };

  const handleFilter = () => {
    setChecked(!checked);
  };

  const changeHandler = (event) => {
    formatDate();
    setFormTraining({
      ...formTraining,
      [event.target.name]: event.target.value,
    });
    console.log(formTraining);
  };

  const updateTraining = async (id) => {
    const year = date.toISOString().split("T")[0].split("-")[0];
    const month = date.toISOString().split("T")[0].split("-")[1];
    const day = +date.toISOString().split("T")[0].split("-")[2] + 1;
    const newDate = year + "-" + month + "-" + day;
    const timeStart = newDate + "T" + formTraining.timeFrom;
    const timeEnd = newDate + "T" + formTraining.timeTo;
    const { place } = formTraining;
    await axios
      .put(
        `${TRAINING_URL}${id}`,
        { place, timeFrom: timeStart, timeTo: timeEnd },
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
        setError(false);
        setOpen(true);
        setUpdated(!updated);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className="main">
      <div className="trainings">
        <h2>My Trainings</h2>
        <h3>Order By Date in</h3>
        <span className="toggle-span">ASC</span>
        <input
          type="checkbox"
          id="toggle"
          className="checkbox"
          onChange={handleFilter}
        />
        <label htmlFor="toggle" className="switch"></label>
        <span className="toggle-span">DESC</span>
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Date</th>
              <th>Time Start</th>
              <th>Time End</th>
              <th>Trainer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <Trainings
            checked={checked}
            setModalActive={setModalActive}
            setForm={setFormTraining}
            form={formTraining}
            setOpen={setOpen}
            changed={changed}
            setChanged={setChanged}
            setError={setError}
            setDeleteOrUpdate={setDeleteOrUpdate}
            updateTraining={updateTraining}
          ></Trainings>
        </table>
      </div>
      <ModalChangeTraining active={modalActive} setActive={setModalActive}>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
        <form>
          {/* <h1>{formTraining.id}</h1> */}
          <div className="text-center">
            Selected date: {date.toDateString()}
          </div>
          <input
            className="update-trainer-input"
            type="text"
            value={formTraining.place === null ? "" : formTraining.place}
            placeholder="Place"
            name="place"
            readOnly
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={formTraining.timeFrom === null ? "" : formTraining.timeFrom}
            placeholder="Time Start"
            name="timeFrom"
            onChange={changeHandler}
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={formTraining.timeTo === null ? "" : formTraining.timeTo}
            placeholder="Time End"
            name="timeTo"
            onChange={changeHandler}
          ></input>
          <input
            className="update-trainer-input"
            type="text"
            value={
              formTraining.trainerUsername === null
                ? ""
                : formTraining.trainerUsername
            }
            placeholder="Trainer Name"
            name="trainerUsername"
            readOnly
          ></input>
        </form>
        <div className="change-buttons">
          <button
            className="update-trainers-button"
            onClick={() => {
              updateTraining(formTraining.id);
              setModalActive(false);
            }}
          >
            UPDATE
          </button>
        </div>
      </ModalChangeTraining>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {error ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {deleteOrUpdate
              ? "You have an error on updating this training!"
              : "You have an error on deleting this training!"}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {deleteOrUpdate
              ? "Training was successfully updated!"
              : "Training was successfully deleted"}
          </Alert>
        )}
      </Snackbar>
    </main>
  );
};
