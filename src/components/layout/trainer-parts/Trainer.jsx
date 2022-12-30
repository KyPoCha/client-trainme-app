import { Link } from "react-router-dom";
import { TrainerImage } from "./TrainerImage";

export const Trainer = (props) => {
  const {
    id,
    username,
    reviewValue,
    email,
    telephone,
    priceForOneTraining,
    priceForMonthTraining,
    dateOfBirthday,
    role,
    setActive,
    setImageActive,
    isSwiper,
    setTrainerId,
    setTrainerUsername,
    setTrainerImageId,
  } = props;
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="banner">
          <TrainerImage
            id={id}
            role={role}
            setImageActive={setImageActive}
            setTrainerImageId={setTrainerImageId}
          ></TrainerImage>
        </div>
        <div className="menu">
          {role === "ADMIN" && (
            <div
              className="opener"
              onClick={() => {
                setActive(id);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        {isSwiper && (
          <div className="choose-button-container">
            <button
              className="choose-button"
              onClick={() => {
                setTrainerId(id);
                setTrainerUsername(username);
              }}
            >
              CHOOSE
            </button>
          </div>
        )}
        <h2 className="name">{username}</h2>
        <div className="title">
          Rating by reviews: <span className="title-rating">{reviewValue}</span>
        </div>
        <div className="actions">
          <div className="follow-info">
            <h2>
              <Link to="#">
                <span>{priceForOneTraining}</span>
                <small>Price For One Training</small>
              </Link>
            </h2>
            <h2>
              <Link to="#">
                <span>{priceForMonthTraining}</span>
                <small>Price For Month Training</small>
              </Link>
            </h2>
          </div>
        </div>
        <div className="desc">
          <h3 className="trainer-email">Email: {email}</h3>
          <h3 className="trainer-birthday">Birthday: {dateOfBirthday}</h3>
          <h3 className="trainer-telephone">Tel.: {telephone}</h3>
        </div>
      </div>
    </div>
  );
};
