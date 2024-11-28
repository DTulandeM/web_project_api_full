import { useState } from "react";
import { Link } from "react-router-dom";
function Singin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <form className="home" noValidate>
      <h1 className="home__title">Inicia sesión</h1>
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
          name="btnLogin"
          type="submit"
          className="home__button"
          onClick={handleSubmit}
        >
          Inicia sesión
        </button>
        <span className="home__foot">
          ¿Aún no eres miembro?{" "}
          <Link className="home__link" to="/signup">
            Regístrate aquí
          </Link>
        </span>
      </fieldset>
    </form>
  );
}

export default Singin;
