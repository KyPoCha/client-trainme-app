import { useEffect, useState } from "react";
import axios from "axios";
import { Training } from "./Training";
import { TRAINING_URL } from "../../../API_CONSTANTS";

export const Trainings = ({
  checked,
  setModalActive,
  setForm,
  form,
  setChanged,
  changed,
  setOpen,
  setError,
  setDeleteOrUpdate,
  updateTraining,
}) => {
  const [trainings, setTrainings] = useState([]);

  const getTrainings = async (query = "asc") => {
    await axios
      .get(TRAINING_URL, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          order: query,
        },
      })
      .then((res) => {
        const data = res.data;
        setTrainings(data);
      })
      .catch((err) => {
        console.log(err);
        // localStorage.clear("token");
      });
  };

  const deleteTraining = async (id) => {
    await axios
      .delete(`${TRAINING_URL}${id}`, {
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

  useEffect(() => {
    if (checked) {
      getTrainings("desc");
    } else {
      getTrainings("asc");
    }
  }, [checked, changed]);

  return (
    <tbody>
      {trainings.map((training) => {
        return (
          <Training
            key={training.id}
            {...training}
            deleteTraining={deleteTraining}
            updateTraining={updateTraining}
            setOpen={setOpen}
            setError={setError}
            setDeleteOrUpdate={setDeleteOrUpdate}
            setModalActive={setModalActive}
            setForm={setForm}
          ></Training>
        );
      })}
    </tbody>
  );
};
