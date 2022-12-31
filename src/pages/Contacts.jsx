import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

export const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
  });

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const handleOpen = () => {
    if (isValidEmail(form.email)) {
      setError(false);
    } else {
      setError(true);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <main className="main">
      <div className="contacts">
        <div className="content">
          <div className="content-left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div className="topic">Address</div>
              <div className="text-one">Na Příkopě 17/1047</div>
              <div className="text-two">Prague</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div className="topic">Phone</div>
              <div className="text-one">+420 007 077 770</div>
              <div className="text-two">+420 227 277 772</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope"></i>
              <div className="topic">Email</div>
              <div className="text-one">trainme@gmail.com</div>
              <div className="text-two">info.trainme@gmail.com</div>
            </div>
          </div>
          <div className="content-right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              If you have any questions for us or any types of bugs related to
              our app, you can send us message from here. It's our pleasure to
              help you.
            </p>
            <form action="#">
              <div className="input-box">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={changeHandler}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={changeHandler}
                />
              </div>
              <div className="input-box message-box"></div>
              <div className="button">
                <input type="button" value="Send Now" onClick={handleOpen} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {!error ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message is sent!
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            You have invalid email!
          </Alert>
        )}
      </Snackbar>
    </main>
  );
};
