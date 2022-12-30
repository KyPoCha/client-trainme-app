import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/layout/common-parts/Sidebar";
import { Footer } from "./components/layout/common-parts/Footer";
import { AccountSide } from "./components/layout/common-parts/AccountSide";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { Trainers } from "./pages/Trainers";
import { MyTrainings } from "./pages/MyTrainings";
import { AddTraining } from "./pages/AddTraining";
import { NotFound } from "./pages/NotFound";
import { AuthPage } from "./pages/AuthPage";
import { AuthVerify } from "./hooks/AuthVerify";
import { ScrollToTop } from "./hooks/ScrollToTop";
import { AUTH_URL } from "./API_CONSTANTS";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorResponse, setErrorResponse] = useState(null);
  const [updated, setUpdated] = useState(1);

  // const dispatch = useDispatch();

  const login = async ({ username, password }) => {
    await axios
      .post(`${AUTH_URL}signin`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res, "res");
        const data = res.data;
        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("dark-theme", "");
        setToken(token);
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(err.code);
      });
  };

  const register = async (form) => {
    await axios
      .post(`${AUTH_URL}signup`, { ...form })
      .then((res) => {
        const data = res.data.message;
        if (data === "User registered successfully!") {
          setIsRegistered(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorResponse(err.code);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigator.window.location.reload();
  };

  let interval = setInterval(function () {
    localStorage.removeItem("token");
    window.location.reload();
  }, 600_000);

  clearInterval(interval);

  // const logOut = useCallback(() => {
  //   dispatch(logoutHandler());
  // }, [dispatch]);

  if (token === null) {
    return (
      <AuthPage
        login={login}
        register={register}
        isRegistered={isRegistered}
        errorResponse={errorResponse}
      ></AuthPage>
    );
  } else {
    return (
      <React.Fragment>
        <Router basename="/" onUpdate={() => window.scrollTo(0, 0)}>
          <div className="container">
            <Sidebar token={token} logoutHandler={logoutHandler} />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route
                path="/trainings"
                element={
                  <MyTrainings setUpdated={setUpdated} updated={updated} />
                }
              />
              <Route
                path="/add"
                element={
                  <AddTraining setUpdated={setUpdated} updated={updated} />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AccountSide updated={updated} />
          </div>
          <Footer />
          <AuthVerify logout={logoutHandler}></AuthVerify>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
