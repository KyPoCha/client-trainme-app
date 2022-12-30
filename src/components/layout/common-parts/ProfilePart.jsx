import { useState, useEffect } from "react";
import axios from "axios";
import { USER_URL } from "../../../API_CONSTANTS";

export const ProfilePart = () => {
  const [classNameB1, setClassNameB1] = useState(
    "material-symbols-sharp active"
  );
  const [classNameB2, setClassNameB2] = useState("material-symbols-sharp");
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    memberships: [""],
  });

  const themeTogglerHandler = () => {
    if (classNameB1.includes("active") && !classNameB2.includes("active")) {
      setClassNameB2((current) => current + " active");
      setClassNameB1((current) => current.replace("active", ""));
    } else {
      setClassNameB1((current) => current + " active");
      setClassNameB2((current) => current.replace("active", ""));
    }

    setIsOpen(!isOpen);
  };

  const getProfile = async () => {
    await axios
      .get(USER_URL, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const data = res.data;
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
    document.body.classList.toggle("dark-theme-variables", isOpen);
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <div className="top">
      <button
        id="menu-btn"
        onClick={() => {
          const sideMenu = document.querySelector("aside");
          sideMenu.style.display = "block";
        }}
      >
        <span className="material-symbols-sharp">menu</span>
      </button>
      <div className="theme-toggler">
        <span className={classNameB1} onClick={themeTogglerHandler}>
          light_mode
        </span>
        <span className={classNameB2} onClick={themeTogglerHandler}>
          dark_mode
        </span>
      </div>
      <div className="profile">
        <div className="info">
          <p>
            Hey, <b>{user.username}</b>
          </p>
          <small className="text-muted">
            {user.memberships.includes("ROLE_ADMIN") ? "ADMIN" : "STANDARD"}
          </small>
        </div>
      </div>
    </div>
  );
};
