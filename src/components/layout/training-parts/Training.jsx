export const Training = (props) => {
  const {
    id,
    place,
    timeTo,
    timeFrom,
    trainerUsername,
    deleteTraining,
    setOpen,
    setModalActive,
    setForm,
    setError,
    setDeleteOrUpdate,
  } = props;
  let status = "";

  const filterDate = () => {
    const date = timeFrom.split("T");
    return date[0];
  };

  const filterTime = (timeNotFiltered) => {
    const timeFiltered = timeNotFiltered.split("T");
    return timeFiltered[1];
  };

  const printRemainingTime = (timeTo, timeFrom) => {
    const date1 = new Date(timeTo);
    const date2 = new Date(timeFrom);
    const now = new Date();
    const diffNowAndTo = date1 - now;
    const diffNowAndFrom = date2 - now;

    if (diffNowAndTo <= 0) {
      status = "Finished";
      return "danger";
    } else if (diffNowAndFrom <= 0 && diffNowAndTo > 0) {
      status = "In Progress";
      return "warning";
    } else {
      status = "Will be";
      return "success";
    }
  };

  return (
    <tr>
      <td>{place}</td>
      <td>{filterDate()}</td>
      <td>{filterTime(timeFrom)}</td>
      <td>{filterTime(timeTo)}</td>
      <td>{trainerUsername}</td>
      <td className={printRemainingTime(timeTo, timeFrom)}>{status}</td>
      <td
        style={{
          color: "var(--color-warning)",
          cursor:
            printRemainingTime(timeTo, timeFrom) === "success" ? "pointer" : "",
        }}
        onClick={() => {
          if (printRemainingTime(timeTo, timeFrom) === "success") {
            console.log(timeFrom.split("T")[1]);
            const timeStart = timeFrom.split("T")[1];
            const timeEnd = timeTo.split("T")[1];
            setForm({
              id,
              place,
              timeFrom: timeStart,
              timeTo: timeEnd,
              trainerUsername,
            });
            setModalActive(true);
          } else {
            setDeleteOrUpdate(true);
            setOpen(true);
            setError(true);
          }
        }}
      >
        Update
      </td>
      <td
        style={{ color: "var(--color-danger)", cursor: "pointer" }}
        onClick={() => {
          setOpen(true);
          deleteTraining(id);
        }}
      >
        Delete
      </td>
    </tr>
  );
};
