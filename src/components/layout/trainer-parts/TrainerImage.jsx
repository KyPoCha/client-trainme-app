import axios from "axios";
import { useState, useEffect } from "react";
import defaultImg from "../../../assets/istockphoto-906005492-612x612.jpeg";
import { IMAGE_URL } from "../../../API_CONSTANTS";

export const TrainerImage = (props) => {
  const { id, role, setImageActive, setTrainerImageId } = props;
  const [data, setData] = useState({
    uri: "",
    imageBytes: "",
    trainerId: 0,
  });

  const getTrainerFoto = async (id) => {
    await axios
      .get(`${IMAGE_URL}${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTrainerFoto(id);
  }, [id]);

  const formatImage = () => {
    if (data.imageBytes == null) {
      return null;
    }
    return "data:image/png;base64," + data.imageBytes;
  };

  return (
    <div className="trainer-img">
      <img
        className="trainer-card-img"
        src={formatImage(id)}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = defaultImg;
        }}
        alt="not found"
      ></img>
      {role === "ADMIN" && (
        <button
          className="change-button"
          onClick={() => {
            setImageActive(true);
            setTrainerImageId(id);
          }}
        >
          {" "}
          Add/Replace foto
        </button>
      )}
    </div>
  );
};
