import React from "react";

export const ModalImageUpload = ({ active, setActive, children }) => {
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
