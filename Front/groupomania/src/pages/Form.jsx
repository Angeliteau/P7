import React, { useState } from "react";
import "../styles/Form.css";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import logo from "../Images/icon-left-font.png";

////////// PAGE DE CONNECTION //////////
const Home = () => {
  const [SignUpModal, setSignUpModal] = useState(false);
  const [LogInModal, setLogInpModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUpModal(true);
      setLogInpModal(false);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setLogInpModal(true);
    }
  };

  return (
    <div className="Main">
      <div className="WrappForm">
        <ul className="UlForm">
          <li
            onClick={handleModals}
            id="register"
            className={SignUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={LogInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {SignUpModal && <SignupForm />}
        {LogInModal && <LoginForm />}
      </div>
      <img src={logo} alt="Logo Groupomania" id="Logo"></img>
    </div>
  );
};

export default Home;
