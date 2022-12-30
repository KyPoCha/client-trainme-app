import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const AuthPage = ({ login, register, isRegistered, errorResponse }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const passwordMatches = () => {
    return form.password === form.confirmPassword;
  };

  const checkFormOnEmptyData = () => {
    return !(
      form.email === "" ||
      form.username === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    );
  };

  const handleOpenLogin = () => {
    if (errorResponse !== "ERR_BAD_REQUEST") {
      setError(false);
    } else {
      setError(true);
    }
    setOpen(true);
  };

  const handleOpenRegister = () => {
    if (
      isValidEmail(form.email) ||
      passwordMatches() ||
      errorResponse !== "ERR_BAD_REQUEST" ||
      checkFormOnEmptyData()
    ) {
      setError(false);
    } else {
      setError(true);
    }
    setOpen(true);
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const handleLogin = () => {
    handleOpenLogin();
    login({ username: form.username, password: form.password });
  };

  const handleRegister = () => {
    handleOpenRegister();
    register(form);
    if (isRegistered) {
      const signupTrigger = document.querySelectorAll(".signup__trigger");
      const signupElement = document.querySelector("#signup");
      const signupWrapperElement = document.querySelector("#signup-wrapper");
      signupTrigger[0].classList.toggle("is-trigger-hidden");
      signupElement.classList.toggle("is-form-open");
      signupWrapperElement.classList.toggle("is-wrapper-open");
      const signupForm = document.querySelectorAll("input");
      signupForm.forEach((el) => (el.value = ""));
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <form className="login form">
          <span className="login__icon">TrainMe App</span>
          <h2 className="login__title">log in to TrainMe App</h2>
          <div className="login__row">
            <label className="login__label" htmlFor="lg-em">
              Your Username
            </label>
            <input
              className="login__input"
              id="lg-em"
              type="text"
              placeholder="Username"
              name="username"
              onChange={changeHandler}
            />
          </div>
          <div className="login__row">
            <label className="login__label" htmlFor="lg-ps">
              Your password
            </label>
            <input
              className="login__input"
              id="lg-ps"
              type="password"
              placeholder="******"
              name="password"
              onChange={changeHandler}
            />
          </div>
          <div className="login__row">
            <button
              className="login__button"
              type="button"
              onClick={handleLogin}
            >
              sign in
            </button>
          </div>
        </form>
        <form className="signup is-form-open form" id="signup">
          <svg
            className="svg-icon signup__trigger signup__trigger--fixed"
            viewBox="0 0 20 20"
            onClick={() => {
              const signupTrigger =
                document.querySelectorAll(".signup__trigger");
              const signupElement = document.querySelector("#signup");
              const signupWrapperElement =
                document.querySelector("#signup-wrapper");
              const forms = document.querySelectorAll(".form");

              const openFormFunc = () => {
                signupTrigger[0].classList.toggle("is-trigger-hidden");
                signupElement.classList.toggle("is-form-open");
                signupWrapperElement.classList.toggle("is-wrapper-open");
              };

              signupTrigger.forEach((s) =>
                s.addEventListener("click", openFormFunc)
              );
              forms.forEach((f) =>
                f.addEventListener("submit", (e) => e.preventDefault())
              );
            }}
          >
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg>
          <div className="signup__wrapper is-wrapper-open" id="signup-wrapper">
            <div className="signup__row signup__row--flex">
              <span className="signup__icon">TrainMe App</span>
              <svg
                className="svg-icon signup__trigger"
                viewBox="0 0 20 20"
                onClick={() => {
                  const signupTrigger =
                    document.querySelectorAll(".signup__trigger");
                  const signupElement = document.querySelector("#signup");
                  const signupWrapperElement =
                    document.querySelector("#signup-wrapper");
                  const forms = document.querySelectorAll(".form");

                  const openFormFunc = () => {
                    signupTrigger[0].classList.toggle("is-trigger-hidden");
                    signupElement.classList.toggle("is-form-open");
                    signupWrapperElement.classList.toggle("is-wrapper-open");
                  };

                  signupTrigger.forEach((s) =>
                    s.addEventListener("click", openFormFunc)
                  );
                  forms.forEach((f) =>
                    f.addEventListener("submit", (e) => e.preventDefault())
                  );
                }}
              >
                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
              </svg>
            </div>
            <h2 className="signup__title">sign up for free, now.</h2>
            <div className="signup__row">
              <label className="signup__label" htmlFor="su-us">
                Username
              </label>
              <input
                className="signup__input"
                id="su-us"
                type="text"
                placeholder="johndoe"
                name="username"
                onChange={changeHandler}
              />
            </div>
            <div className="signup__row">
              <label className="signup__label" htmlFor="su-em">
                E-Mail
              </label>
              <input
                className="signup__input"
                id="su-em"
                type="email"
                placeholder="example@email.com"
                name="email"
                onChange={changeHandler}
              />
            </div>
            <div className="signup__row">
              <label className="signup__label" htmlFor="su-us">
                First Name
              </label>
              <input
                className="signup__input"
                id="su-us"
                type="text"
                placeholder="John"
                name="first_name"
                onChange={changeHandler}
              />
            </div>
            <div className="signup__row">
              <label className="signup__label" htmlFor="su-us">
                Last Name
              </label>
              <input
                className="signup__input"
                id="su-us"
                type="text"
                placeholder="Doe"
                name="last_name"
                onChange={changeHandler}
              />
            </div>
            <div className="signup__row">
              <label className="signup__label" htmlFor="su-ps">
                password
              </label>
              <input
                className="signup__input"
                id="su-ps"
                type="password"
                placeholder="******"
                name="password"
                onChange={changeHandler}
              />
            </div>
            <div className="signup__row">
              <label className="signup__label" htmlFor="su-ps">
                Confirm Your Password
              </label>
              <input
                className="signup__input"
                id="su-ps"
                type="password"
                placeholder="******"
                name="confirmPassword"
                onChange={changeHandler}
              />
            </div>
            <div className="signup__row">
              <button className="signup__button" onClick={handleRegister}>
                sign up
              </button>
            </div>
          </div>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={3000}>
        {!error ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            Message is sent!
          </Alert>
        ) : (
          <Alert severity="error" sx={{ width: "100%" }}>
            You have an error in your entered data! Please try again
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};
