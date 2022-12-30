import { Link } from "react-router-dom";
import logo from "../../../icons8-sport-64.png";

export const Sidebar = ({ token, logoutHandler }) => {
  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src={logo} alt="" />
          <h2 style={{ color: "var(--color-primary-variant)" }}>
            Train <span className="yellow">Me</span>
          </h2>
        </div>
        <div
          className="close"
          id="close-btn"
          onClick={() => {
            const sideMenu = document.querySelector("aside");
            sideMenu.style.display = "none";
          }}
        >
          <span className="material-symbols-sharp">close</span>
        </div>
      </div>
      <div className="sidebar">
        <Link to="/">
          <span className="material-symbols-sharp">space_dashboard</span>
          <h3>Home</h3>
        </Link>
        <Link to="/trainers">
          <span className="material-symbols-sharp">person</span>
          <h3>Our Trainers</h3>
        </Link>
        <Link to="/add">
          <span className="material-symbols-sharp">add</span>
          <h3>Add Training</h3>
        </Link>
        <Link to="/trainings">
          <span className="material-symbols-sharp">event_note</span>
          <h3>My Trainings</h3>
        </Link>
        <Link to="/contacts">
          <span className="material-symbols-sharp">insights</span>
          <h3>Contacts</h3>
        </Link>
        <a href="#a" onClick={logoutHandler}>
          <span className="material-symbols-sharp">logout</span>
          <h3>Logout</h3>
        </a>
      </div>
    </aside>
  );
};
