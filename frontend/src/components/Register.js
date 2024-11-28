import { useState } from "react";
import { Link } from "react-router-dom";
function Signup({ register }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    register(email, password);
  }
  return (
    <form className="home" noValidate>
      <h1 className="home__title">Regístrate</h1>
      <fieldset className="home__fieldset">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="home__input"
          id="email"
          placeholder="Correo Electrónico"
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="home__input"
          id="password"
          placeholder="Contraseña"
          required
        />
        <button
          name="btnRegister"
          type="submit"
          className="home__button"
          onClick={handleSubmit}
        >
          Regístrate
        </button>
        <span className="home__foot">
          ¿Ya eres miembro?{" "}
          <Link className="home__link" to="/signin">
            Inicia sesión aquí
          </Link>
        </span>
      </fieldset>
    </form>
  );
}
export default Signup;
