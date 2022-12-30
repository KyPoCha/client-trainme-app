export const NearestTraining = (props) => {
  const { training } = props;
  return (
    <div className="item">
      <div className="icon">
        <span className="material-symbols-sharp">sports_gymnastics</span>
      </div>
      <div className="right">
        <div className="info">
          <h3>{training.place}</h3>
          <small className="text-muted">{training.trainerUsername}</small>
        </div>
        <h3>
          {training.timeFrom.split("T")[0].split("-")[2] +
            "." +
            training.timeFrom.split("T")[0].split("-")[1]}
        </h3>
      </div>
    </div>
  );
  // }
};
