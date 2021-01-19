import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, useAuthState } from '../context/AuthContext';
import { ReactComponent as Spinner } from '../assets/refresh.svg';

function SignIn() {
  // context-functies
  const { login } = useContext(AuthContext);
  const { isAuthenticated } = useAuthState();

  // state voor invoervelden (omdat het formulier met Controlled Components werkt!)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state voor gebruikersfeedback
  const [loading, toggleLoading] = useState(false);
  const [error, setError] = useState('');

  // react-router dingen
  const history = useHistory();

  // Deze functie wordt elke keer afgevuurd als isAuthenticated (uit context) veranderd
  useEffect(() => {
    // als hij de waarde true heeft, DAN sturen we de gebruiker door!
    if (isAuthenticated === true) {
      history.push('/profile');
    }
  }, [isAuthenticated]);

  async function onSubmit(event) {
    toggleLoading(true);
    setError('');
    // Als je react-hook-form gebruikt hoeft dit niet, dat gebeurt dan automatisch
    event.preventDefault();

    try {
      const response = await axios.post('https://polar-lake-14365.herokuapp.com/api/auth/signin', {
        username: username,
        password: password,
      })

      // We roepen hier de context-functie "login" aan. De context gaat dan met de data die we hebben
      // teruggekregen alles op de juiste manier in localstorage en state zetten!
      login(response.data);
    } catch(e) {
      // Gaat het mis? Log het in de console!
      console.error(e);
      setError('Inloggen is mislukt');
      // Tip: als de gebruikersnaam niet bestaat of wachtwoord is verkeerd, stuurt de backend een 401!
    }
    toggleLoading(false);
  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="username-field">
          Gebruikersnaam:
          <input
            type="text"
            id="username-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="password-field">
          Wachtwoord:
          <input
            type="password"
            id="password-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button
          type="submit"
          className="form-button"
          disabled={loading}
        >
          {loading ? <Spinner className="loading-icon" /> : 'Maak account aan'}
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;