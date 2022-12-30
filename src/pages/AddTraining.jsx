import { useState } from "react";
import { Calendar } from "react-calendar";
import { SwipersTrainer } from "../components/layout/training-parts/SwipersTrainer";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { TRAINING_URL } from "../API_CONSTANTS";

export const AddTraining = ({ setUpdated, updated }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [trainerId, setTrainerId] = useState(0);
  const [trainerUsername, setTrainerUsername] = useState("");
  const [formTraining, setFormTraining] = useState({
    place: null,
    timeFrom: null,
    timeTo: null,
  });
  // eslint-disable-next-line
  const halls = [
    "Hall 404",
    "Hall 301",
    "Hall 405",
    "Hall 420",
    "Hall 058",
    "Hall 323",
    "Hall 012",
    "General Hall 001",
  ];

  /*TODO: MAKE A NORMAL INPUT LIST IN APPOINTMENT*/

  const formatDate = (date) => {
    const year = date.toISOString().split("T")[0].split("-")[0];
    const month = date.toISOString().split("T")[0].split("-")[1];
    const day = +date.toISOString().split("T")[0].split("-")[2] + 1;

    return year + "-" + month + "-" + day;
  };

  const isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) return false;
    return true;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event) => {
    switch (event.target.name) {
      case "timeTo":
        const timeStart = formatDate(date) + "T" + event.target.value;
        setFormTraining({ ...formTraining, [event.target.name]: timeStart });
        break;
      case "timeFrom":
        const timeEnd = formatDate(date) + "T" + event.target.value;
        setFormTraining({ ...formTraining, [event.target.name]: timeEnd });
        break;
      default:
        setFormTraining({
          ...formTraining,
          [event.target.name]: event.target.value,
        });
    }
  };

  const createTraining = async () => {
    if (isIsoDate(formTraining.timeFrom) && isIsoDate(formTraining.timeTo)) {
      await axios
        .post(
          TRAINING_URL,
          { trainerId, ...formTraining },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          setOpen(true);
          setUpdated(!updated);
          setError(false);
        })
        .catch((err) => {
          setOpen(true);
          setError(true);
        });
    } else {
      setOpen(true);
      setError(true);
    }
  };

  return (
    <main className="main">
      <div className="row">
        <div
          className="col-xs-7 col-centered"
          style={{
            width: "55vw",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{ width: "55vw", display: "flex", justifyContent: "center" }}
          >
            <h1 style={{ textAlign: "center" }}>
              Add a training on appropriate date
            </h1>
          </div>
          <div className="calendar-container">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
        <div className="row">
          <div className="col offset-md-1">
            <form id="form_create_appointment">
              <div className="form-row">
                <div className="col form-group">
                  <label className="required">Date</label>
                  <input
                    className="form-control date-input"
                    style={{ color: "var(--color-dark)" }}
                    type="text"
                    id="date"
                    data-trigger="hover"
                    data-toggle="popover"
                    title="Date"
                    value={formatDate(date)}
                    readOnly
                    data-content="You can select any date from today clicking on the number in the calendar"
                    required
                  />
                </div>
                <div className="col form-group">
                  <label>Place</label>
                  <input
                    className="form-control"
                    style={{ color: "var(--color-dark)" }}
                    id="place"
                    list="place"
                    name="place"
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label className="required">Start Time</label>
                  <input
                    className="form-control time-input"
                    style={{ color: "var(--color-dark)" }}
                    type="text"
                    id="start_time"
                    name="timeFrom"
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col form-group">
                  <label className="required">End Time</label>
                  <input
                    style={{ color: "var(--color-dark)" }}
                    className="form-control time-input"
                    type="text"
                    id="end_time"
                    name="timeTo"
                    onChange={changeHandler}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <h2>
                    Choosen Trainer is{" "}
                    <span style={{ color: "var(--color-primary-variant)" }}>
                      {trainerUsername}
                    </span>
                  </h2>
                </div>
              </div>
            </form>
          </div>
          <SwipersTrainer
            setTrainerId={setTrainerId}
            setTrainerUsername={setTrainerUsername}
          ></SwipersTrainer>
        </div>
      </div>
      <div className="center">
        <button
          className="add-training-button"
          onClick={() => createTraining()}
        >
          <h1
            style={{
              color: "var(--color-dark)",
              paddingBottom: "1rem",
            }}
          >
            Add Training
          </h1>
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {error ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            You have an error in form. Please check the entered time and date!
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Training was successfully added!
          </Alert>
        )}
      </Snackbar>
    </main>
  );
};
