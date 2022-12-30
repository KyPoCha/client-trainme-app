import React, { useEffect } from "react";

export const ModalChangeTrainer = ({
  active,
  setActive,
  children,
  getTrainerById,
}) => {
  useEffect(() => {
    getTrainerById(active);
    // eslint-disable-next-line
  }, [active]);

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
        {children}
      </div>
    </div>
  );
};
