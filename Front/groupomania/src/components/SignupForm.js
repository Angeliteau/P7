import axios from "axios";
import { useState } from "react";
import LoginForm from "./LoginForm";

////////// S'INSCRIRE //////////
const SignupForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  // Envoi du formulaire
  const handleRegister = (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    // Mise en forme de la requête
    const data = {
      pseudo,
      email,
      password,
    };

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";

    // Vérification du MDP
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas !";

      // Vérification de la connaissance du CGU
      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales !";
      // Si toutes les conditions sont réunis envoi du formulaire
    } else {
      axios({
        method: "post",
        url: `http://localhost:3000/api/auth/signup`,
        data,
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => {
          // Affichage des erreurs de formulaire
          if (err.response.request.response.includes("pseudo")) {
            pseudoError.innerHTML = "Pseudo déjà utilisé !";
          } else if (err.response.request.response.includes("email")) {
            emailError.innerHTML = "Email déjà utilisée !";
          } else if (err.response.request.response.includes("Format")) {
            emailError.innerHTML = "Format d'email incorrect !";
          }
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <h4 className="success">
            Inscription réussi,
            <br /> veuillez-vous connecter
          </h4>
          <LoginForm />
        </>
      ) : (
        <form action="" onSubmit={handleRegister}>
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </>
  );
};

export default SignupForm;
