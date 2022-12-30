import axios from "axios";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { TRAINER_URL } from "../../../API_CONSTANTS";

export const ModalAddTrainer = ({
  active,
  setActive,
  setAdded,
  added,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [formAddTrainer, setFormAddTrainer] = useState({
    username: "",
    email: "",
    telephone: "",
  });

  const changeHandler = (event) => {
    setFormAddTrainer({
      ...formAddTrainer,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadTrainer = async () => {
    await axios
      .post(
        TRAINER_URL,
        { ...formAddTrainer },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOpen(true);
        setAdded(!added);
      })
      .catch((err) => {
        console.log(err);
        setError(!error);
      });
  };

  return (
    <div
      className={active ? "modal-change-window active" : "modal-change-window"}
      onClick={() => {
        setActive(!active);
      }}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <form>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={changeHandler}
          ></input>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
          ></input>
          <label>Telephone Number</label>
          <input
            type="text"
            placeholder="Telephone"
            name="telephone"
            onChange={changeHandler}
          ></input>
        </form>
        <button
          className="button-add-trainer"
          onClick={() => {
            uploadTrainer();
            setOpen(true);
            if (!error) {
              setActive(!active);
            }
          }}
        >
          +Add
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {!error ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Trainer was added!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            You have invalid data in form!
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
